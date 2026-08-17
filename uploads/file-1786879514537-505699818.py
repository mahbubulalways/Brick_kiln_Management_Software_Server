import glfw             # Window toiri ebong input (keyboard/mouse) neoyar jonno library.
from OpenGL.GL import * # OpenGL er main functions (graphics draw korar jonno).
import glm              # OpenGL Mathematics: Matrix ebong vector calculations er jonno.
import numpy as np      # C-style array toiri korar jonno (OpenGL Python list bojhe na, numpy array dorkar).
import ctypes           # C-data types bebohar korar jonno (OpenGL er sathe data pass korar somoy lage).
import math             # Basic math operations er jonno (jemon sin, cos, radians).

# ── Shaders ───────────────────────────────────────────────────────────────────
# Vertex Shader: 3D point guloke 2D screen e kothay dekhabe ta hisab kore.
# Lighting er jonno FragPos (world space position) ebong Normal (surface direction)
# fragment shader e pathano hocche.
VERTEX_SHADER = """
#version 330 core
layout (location = 0) in vec3 aPos;    // Vertex position.
layout (location = 1) in vec3 aNormal; // Vertex normal (face-er kon dike mukh kora ache).

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

out vec3 FragPos;
out vec3 Normal;

void main() {
    FragPos = vec3(model * vec4(aPos, 1.0));
    // Non-uniform scale thakle normal thik rakhte normal-matrix lagbe (inverse-transpose).
    Normal = mat3(transpose(inverse(model))) * aNormal;
    gl_Position = projection * view * vec4(FragPos, 1.0);
}
"""

# Fragment Shader: Protita pixel er rong ki hobe ta theek kore.
# 3 dhoroner light implement kora hoyeche: Directional, Point, Spot.
# Protita light-er ekta on/off uniform (bool) ache — Python theke J/K/L chaple set hoy.
FRAGMENT_SHADER = """
#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;

uniform vec3 objectColor; // Object er nijer color (base/albedo).
uniform vec3 viewPos;     // Camera-r position (specular hisab korar jonno).

// Light-fixture-er (bulb/tube) cube-gulo jeno nijeder gaye alo pore tar upor depend
// na kore nije theke "jolche" emon dekhay, tai emissive mode: eta on thakle
// lighting calculation baad diye shudhu emissiveColor sozha dekhano hoy.
uniform bool isEmissive;
uniform vec3 emissiveColor;

// ── Directional Light (jemon "sun" - shobjaygay same direction theke ashe) ──
uniform bool  dirLightOn;
uniform vec3  dirLightDirection; // Kon dik theke ashche (world space).
uniform vec3  dirLightColor;

// ── Point Light (Tube light - ekta fixed point theke sob dike chorai) ──
uniform bool  pointLightOn;
uniform vec3  pointLightPos;
uniform vec3  pointLightColor;

// ── Spot Light (ekta cone/torch-er moton, ekta jaygar upor focus kore) ──
uniform bool  spotLightOn;
uniform vec3  spotLightPos;
uniform vec3  spotLightDirection;
uniform vec3  spotLightColor;
uniform float spotInnerCutOff; // cos(inner angle) - eikhane porjonto full bright.
uniform float spotOuterCutOff; // cos(outer angle) - eikhane giye alo fade hoye 0 hoy.

void main() {
    if (isEmissive) {
        FragColor = vec4(emissiveColor, 1.0);
        return;
    }

    vec3 norm    = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);

    // Shob light off thakleo ekdom kalo jeno na hoy, tai khub kom ambient rakha hoyeche.
    vec3 result = 0.05 * objectColor;

    // ── Directional contribution ──
    if (dirLightOn) {
        vec3 lightDir = normalize(-dirLightDirection);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = diff * dirLightColor * objectColor;

        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specular = 0.2 * spec * dirLightColor;

        result += diffuse + specular;
    }

    // ── Point contribution ──
    if (pointLightOn) {
        vec3 lightDir = normalize(pointLightPos - FragPos);
        float diff = max(dot(norm, lightDir), 0.0);

        float dist = length(pointLightPos - FragPos);
        float attenuation = 1.0 / (1.0 + 0.09 * dist + 0.032 * dist * dist);

        vec3 diffuse = diff * pointLightColor * objectColor * attenuation;

        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specular = 0.2 * spec * pointLightColor * attenuation;

        result += diffuse + specular;
    }

    // ── Spot contribution ──
    if (spotLightOn) {
        vec3 lightDir = normalize(spotLightPos - FragPos);
        float diff = max(dot(norm, lightDir), 0.0);

        float dist = length(spotLightPos - FragPos);
        float attenuation = 1.0 / (1.0 + 0.09 * dist + 0.032 * dist * dist);

        float theta   = dot(lightDir, normalize(-spotLightDirection));
        float epsilon = spotInnerCutOff - spotOuterCutOff;
        float intensity = clamp((theta - spotOuterCutOff) / epsilon, 0.0, 1.0);

        vec3 diffuse = diff * spotLightColor * objectColor * attenuation * intensity;

        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specular = 0.2 * spec * spotLightColor * attenuation * intensity;

        result += diffuse + specular;
    }

    FragColor = vec4(result, 1.0);
}
"""

# ── কিউব ডেটা (Position + Normal, 24 vertices — protita face-er nijer 4 ta vertex) ──
# Age 8 ti shared vertex diye cube banano hoyto, kintu lighting-er jonno protita face-r
# nijer alada normal lagbe, tai ekhon protita face-r jonno alada 4 ti vertex bebohar
# kora hocche (6 face * 4 vertex = 24). Protita vertex e: x,y,z, nx,ny,nz.
vertices = np.array([
    # Front face (z+)      normal (0,0,1)
    -0.5, -0.5,  0.5,  0.0, 0.0, 1.0,
     0.5, -0.5,  0.5,  0.0, 0.0, 1.0,
     0.5,  0.5,  0.5,  0.0, 0.0, 1.0,
    -0.5,  0.5,  0.5,  0.0, 0.0, 1.0,
    # Back face (z-)       normal (0,0,-1)
     0.5, -0.5, -0.5,  0.0, 0.0, -1.0,
    -0.5, -0.5, -0.5,  0.0, 0.0, -1.0,
    -0.5,  0.5, -0.5,  0.0, 0.0, -1.0,
     0.5,  0.5, -0.5,  0.0, 0.0, -1.0,
    # Left face (x-)       normal (-1,0,0)
    -0.5, -0.5, -0.5, -1.0, 0.0, 0.0,
    -0.5, -0.5,  0.5, -1.0, 0.0, 0.0,
    -0.5,  0.5,  0.5, -1.0, 0.0, 0.0,
    -0.5,  0.5, -0.5, -1.0, 0.0, 0.0,
    # Right face (x+)      normal (1,0,0)
     0.5, -0.5,  0.5,  1.0, 0.0, 0.0,
     0.5, -0.5, -0.5,  1.0, 0.0, 0.0,
     0.5,  0.5, -0.5,  1.0, 0.0, 0.0,
     0.5,  0.5,  0.5,  1.0, 0.0, 0.0,
    # Top face (y+)        normal (0,1,0)
    -0.5,  0.5,  0.5,  0.0, 1.0, 0.0,
     0.5,  0.5,  0.5,  0.0, 1.0, 0.0,
     0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
    -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,
    # Bottom face (y-)     normal (0,-1,0)
    -0.5, -0.5, -0.5,  0.0, -1.0, 0.0,
     0.5, -0.5, -0.5,  0.0, -1.0, 0.0,
     0.5, -0.5,  0.5,  0.0, -1.0, 0.0,
    -0.5, -0.5,  0.5,  0.0, -1.0, 0.0,
], dtype=np.float32)

# Protita face-r 4 vertex theke 2 ta triangle (6 face * 6 index = 36 index).
indices = np.array([
    0, 1, 2,   2, 3, 0,        # Front
    4, 5, 6,   6, 7, 4,        # Back
    8, 9, 10,  10, 11, 8,      # Left
    12, 13, 14, 14, 15, 12,    # Right
    16, 17, 18, 18, 19, 16,    # Top
    20, 21, 22, 22, 23, 20,    # Bottom
], dtype=np.uint32)

FLOATS_PER_VERTEX = 6  # 3 position + 3 normal

# ── Camera State (Ei part e kono poriborton kora hoyni) ───────────────────────
INIT_CAMERA_POS = glm.vec3(0.0, 1.5, 4.0)
INIT_YAW = -90.0
INIT_PITCH = 0.0

camera_pos   = glm.vec3(0.0, 1.5, 4.0)
camera_front = glm.vec3(0.0, 0.0, -1.0)
camera_up    = glm.vec3(0.0, 1.0, 0.0)

yaw, pitch = -90.0, 0.0

last_x, last_y = 400.0, 300.0
first_mouse = True
delta_time, last_frame = 0.0, 0.0

# ── Light Toggle State ────────────────────────────────────────────────────────
# Shuru te 3 tai OFF thakbe. J = point light (tube light, bed-er upore).
# K = spot light (computer table-er upore). L = directional light (janla diye asha alo).
point_light_on = False
spot_light_on = False
dir_light_on = False

# ── Input Handling ────────────────────────────────────────────────────────────
def mouse_callback(window, xpos, ypos):
    global yaw, pitch, last_x, last_y, first_mouse, camera_front

    if first_mouse:
        last_x, last_y = xpos, ypos
        first_mouse = False

    sensitivity = 0.1
    yaw += (xpos - last_x) * sensitivity
    pitch += (last_y - ypos) * sensitivity
    last_x, last_y = xpos, ypos
    pitch = max(-89.0, min(89.0, pitch))

    update_camera_vectors()

def update_camera_vectors():
    global camera_front, yaw, pitch
    front = glm.vec3(
        glm.cos(glm.radians(yaw)) * glm.cos(glm.radians(pitch)),
        glm.sin(glm.radians(pitch)),
        glm.sin(glm.radians(yaw)) * glm.cos(glm.radians(pitch)),
    )
    camera_front = glm.normalize(front)

def process_input(window):
    global camera_pos, yaw, pitch

    speed = 2.5 * delta_time

    if glfw.get_key(window, glfw.KEY_UP) == glfw.PRESS:
        camera_pos += speed * camera_front
    if glfw.get_key(window, glfw.KEY_DOWN) == glfw.PRESS:
        camera_pos -= speed * camera_front
    if glfw.get_key(window, glfw.KEY_LEFT) == glfw.PRESS:
        camera_pos -= glm.normalize(glm.cross(camera_front, camera_up)) * speed
    if glfw.get_key(window, glfw.KEY_RIGHT) == glfw.PRESS:
        camera_pos += glm.normalize(glm.cross(camera_front, camera_up)) * speed

    if glfw.get_key(window, glfw.KEY_ESCAPE) == glfw.PRESS:
        glfw.set_window_should_close(window, True)

    if glfw.get_key(window, glfw.KEY_O) == glfw.PRESS:
        camera_pos = glm.vec3(INIT_CAMERA_POS)
        yaw = INIT_YAW
        pitch = INIT_PITCH
        update_camera_vectors()

# J / K / L chapa hoile light toggle (on->off, off->on). glfw-r key_callback protibar
# ekta "press" event e ekbari e call hoy (bar bar dhore rakhle repeat hoy na eirokom
# check korar dorkar nai — action == glfw.PRESS mane just-eituku-chapa-hoyeche).
def key_callback(window, key, scancode, action, mods):
    global point_light_on, spot_light_on, dir_light_on

    if action == glfw.PRESS:
        if key == glfw.KEY_J:
            point_light_on = not point_light_on
        elif key == glfw.KEY_K:
            spot_light_on = not spot_light_on
        elif key == glfw.KEY_L:
            dir_light_on = not dir_light_on

# ── Helper Function ───────────────────────────────────────────────────────────
def draw_cube(program, position, scale_size, color_rgb, emissive=False):
    model = glm.translate(glm.mat4(1.0), position)
    model = glm.scale(model, scale_size)

    glUniformMatrix4fv(glGetUniformLocation(program, "model"), 1, GL_FALSE, glm.value_ptr(model))
    glUniform3f(glGetUniformLocation(program, "objectColor"), *color_rgb)
    # emissive=True hole cube ta nijer color e "jole othe" — kono light-er upor depend
    # kore na. Fixture-gulo (bulb/tube) on/off dekhanor jonno eta bebohar kora hoy.
    glUniform1i(glGetUniformLocation(program, "isEmissive"), int(emissive))
    glUniform3f(glGetUniformLocation(program, "emissiveColor"), *color_rgb)
    glDrawElements(GL_TRIANGLES, len(indices), GL_UNSIGNED_INT, None)

# ── Component Functions ───────────────────────────────────────────────────────
def draw_room(program):
    tile_size = 0.5
    start_point = -4.0 + (tile_size / 2)

    for i in range(16):
        for j in range(16):
            x = start_point + i * tile_size
            z = start_point + j * tile_size

            if (i + j) % 2 == 0:
                color = (0.88, 0.88, 0.9)
            else:
                color = (0.75, 0.75, 0.78)

            draw_cube(program, glm.vec3(x, 0.0, z), glm.vec3(tile_size, 0.1, tile_size), color)

    draw_cube(program, glm.vec3(-4.0, 2.0, 0.0), glm.vec3(0.1, 4.0, 8.0), (0.85, 0.9, 0.9))  # Left wall
    draw_cube(program, glm.vec3(4.0, 2.0, 0.0), glm.vec3(0.1, 4.0, 8.0), (0.85, 0.9, 0.9))   # Right wall
    draw_cube(program, glm.vec3(0.0, 2.0, -4.0), glm.vec3(8.0, 4.0, 0.1), (0.75, 0.8, 0.85)) # Front wall
    draw_cube(program, glm.vec3(0.0, 4.0, 0.0), glm.vec3(8.0, 0.1, 8.0), (0.9, 0.9, 0.9))    # Ceiling

def draw_window_left(program):
    draw_cube(program, glm.vec3(-3.9, 2.2, 1.5), glm.vec3(0.1, 1.6, 2.2), (1.0, 1.0, 1.0))
    draw_cube(program, glm.vec3(-3.85, 2.2, 0.95), glm.vec3(0.1, 1.4, 1.0), (0.5, 0.8, 1.0))
    draw_cube(program, glm.vec3(-3.85, 2.2, 2.05), glm.vec3(0.1, 1.4, 1.0), (0.5, 0.8, 1.0))
    draw_cube(program, glm.vec3(-3.82, 2.2, 1.5), glm.vec3(0.05, 1.6, 0.04), (0.9, 0.9, 0.9))
    draw_cube(program, glm.vec3(-3.82, 2.2, 1.5), glm.vec3(0.05, 0.04, 2.1), (0.9, 0.9, 0.9))

def draw_window_front(program):
    draw_cube(program, glm.vec3(2.5, 2.2, -3.9), glm.vec3(2.2, 1.6, 0.1), (1.0, 1.0, 1.0))
    draw_cube(program, glm.vec3(1.95, 2.2, -3.85), glm.vec3(1.0, 1.4, 0.1), (0.5, 0.8, 1.0))
    draw_cube(program, glm.vec3(3.05, 2.2, -3.85), glm.vec3(1.0, 1.4, 0.1), (0.5, 0.8, 1.0))
    draw_cube(program, glm.vec3(2.5, 2.2, -3.82), glm.vec3(0.04, 1.6, 0.05), (0.9, 0.9, 0.9))
    draw_cube(program, glm.vec3(2.5, 2.2, -3.82), glm.vec3(2.1, 0.04, 0.05), (0.9, 0.9, 0.9))

def draw_ac(program):
    draw_cube(program, glm.vec3(-2.0, 3.2, -3.9), glm.vec3(1.8, 0.6, 0.2), (0.95, 0.95, 0.95))
    draw_cube(program, glm.vec3(-2.0, 2.95, -3.88), glm.vec3(1.6, 0.08, 0.18), (0.2, 0.2, 0.2))
    draw_cube(program, glm.vec3(-2.0, 3.05, -3.79), glm.vec3(1.7, 0.02, 0.02), (0.8, 0.8, 0.8))
    draw_cube(program, glm.vec3(-1.3, 3.2, -3.79), glm.vec3(0.2, 0.15, 0.02), (0.1, 0.1, 0.1))
    draw_cube(program, glm.vec3(-1.3, 3.2, -3.78), glm.vec3(0.1, 0.08, 0.01), (0.2, 0.8, 0.2))

def draw_bed(program):
    draw_cube(program, glm.vec3(-2.7, 0.3, -2.0), glm.vec3(2.5, 0.4, 3.5), (0.4, 0.2, 0.1))
    draw_cube(program, glm.vec3(-2.7, 0.56, -2.0), glm.vec3(2.34, 0.22, 3.34), (0.4, 0.7, 0.8))
    draw_cube(program, glm.vec3(-2.7, 1.0, -3.7), glm.vec3(2.5, 1.5, 0.1), (0.3, 0.15, 0.05))
    draw_cube(program, glm.vec3(-3.2, 0.72, -3.2), glm.vec3(0.9, 0.15, 0.6), (0.9, 0.9, 0.95))
    draw_cube(program, glm.vec3(-2.2, 0.72, -3.2), glm.vec3(0.9, 0.15, 0.6), (0.9, 0.9, 0.95))

def draw_table_and_chair(program):
    draw_cube(program, glm.vec3(2.5, 1.2, -2.5), glm.vec3(2.0, 0.1, 1.5), (0.5, 0.3, 0.1))

    leg_size = glm.vec3(0.1, 1.2, 0.1)
    color = (0.3, 0.15, 0.05)
    draw_cube(program, glm.vec3(1.6, 0.6, -1.85), leg_size, color)
    draw_cube(program, glm.vec3(3.4, 0.6, -1.85), leg_size, color)
    draw_cube(program, glm.vec3(1.6, 0.6, -3.15), leg_size, color)
    draw_cube(program, glm.vec3(3.4, 0.6, -3.15), leg_size, color)

    draw_cube(program, glm.vec3(2.5, 0.7, -1.2), glm.vec3(0.7, 0.1, 0.7), (0.2, 0.2, 0.2))
    draw_cube(program, glm.vec3(2.5, 1.2, -0.9), glm.vec3(0.7, 1.0, 0.1), (0.2, 0.2, 0.2))

    c_leg = glm.vec3(0.08, 0.7, 0.08)
    draw_cube(program, glm.vec3(2.2, 0.35, -0.9), c_leg, (0.6, 0.6, 0.6))
    draw_cube(program, glm.vec3(2.8, 0.35, -0.9), c_leg, (0.6, 0.6, 0.6))
    draw_cube(program, glm.vec3(2.2, 0.35, -1.5), c_leg, (0.6, 0.6, 0.6))
    draw_cube(program, glm.vec3(2.8, 0.35, -1.5), c_leg, (0.6, 0.6, 0.6))

def draw_computer(program):
    draw_cube(program, glm.vec3(2.5, 1.3, -2.8), glm.vec3(0.2, 0.2, 0.2), (0.1, 0.1, 0.1))
    draw_cube(program, glm.vec3(2.5, 1.6, -2.8), glm.vec3(1.0, 0.6, 0.05), (0.1, 0.1, 0.1))
    draw_cube(program, glm.vec3(2.5, 1.6, -2.75), glm.vec3(0.9, 0.5, 0.05), (0.8, 0.9, 1.0))

    draw_cube(program, glm.vec3(2.5, 1.26, -2.1), glm.vec3(0.8, 0.03, 0.3), (0.15, 0.15, 0.15))
    draw_cube(program, glm.vec3(2.4, 1.28, -2.12), glm.vec3(0.55, 0.015, 0.2), (0.25, 0.25, 0.25))
    draw_cube(program, glm.vec3(2.8, 1.28, -2.12), glm.vec3(0.15, 0.015, 0.2), (0.25, 0.25, 0.25))
    draw_cube(program, glm.vec3(2.4, 1.29, -2.05), glm.vec3(0.2, 0.01, 0.04), (0.35, 0.35, 0.35))

    draw_cube(program, glm.vec3(3.1, 1.26, -2.1), glm.vec3(0.12, 0.03, 0.2), (0.1, 0.1, 0.1))
    draw_cube(program, glm.vec3(3.1, 1.28, -2.08), glm.vec3(0.1, 0.03, 0.12), (0.15, 0.15, 0.15))
    draw_cube(program, glm.vec3(3.1, 1.30, -2.14), glm.vec3(0.02, 0.02, 0.04), (0.0, 0.8, 1.0))

    draw_cube(program, glm.vec3(3.2, 0.6, -2.5), glm.vec3(0.4, 1.0, 0.8), (0.1, 0.1, 0.1))

def draw_almari(program):
    draw_cube(program, glm.vec3(3.3, 1.5, 1.8), glm.vec3(1.2, 3.0, 1.5), (0.4, 0.2, 0.05))
    draw_cube(program, glm.vec3(2.69, 1.5, 1.8), glm.vec3(0.02, 2.9, 0.02), (0.1, 0.05, 0.01))
    draw_cube(program, glm.vec3(2.67, 1.5, 1.6), glm.vec3(0.04, 0.25, 0.04), (0.8, 0.8, 0.8))
    draw_cube(program, glm.vec3(2.67, 1.5, 2.0), glm.vec3(0.04, 0.25, 0.04), (0.8, 0.8, 0.8))

# Protita light-er nijer ekta fixture-cube ache, ebong seta ekhon EMISSIVE — mane
# ei cube ta point_light_on / spot_light_on / dir_light_on er state onujayi nijer
# gaye "jole othe" ba "nive jay", ghorer baki lighting-er upor depend kore na. Tai
# J/K/L chaple sathe sathe bujha jabe kon light ta on hoyeche.
ON_GLOW = {
    "point": (1.0, 1.0, 0.85),   # Tube light jokhon jole
    "spot": (1.0, 0.95, 0.55),   # Spot bulb jokhon jole
    "dir": (1.0, 0.85, 0.5),     # Directional (sunlight) indicator jokhon on
}
OFF_GLOW = {
    "point": (0.25, 0.25, 0.22),  # Nibhe thakle matt/dim tube
    "spot": (0.15, 0.15, 0.15),   # Nibhe thakle kalo-moto bulb
    "dir": (0.2, 0.2, 0.22),      # Nibhe thakle dim indicator
}

def draw_light_fixtures(program):
    # ── Point light fixture: tube light, bed-er upore ceiling-er kache ──
    tube_color = ON_GLOW["point"] if point_light_on else OFF_GLOW["point"]
    draw_cube(program, glm.vec3(-2.7, 3.75, -2.0), glm.vec3(0.5, 0.06, 0.12), tube_color, emissive=True)

    # ── Spot light fixture: computer table-er thik upore ──
    draw_cube(program, glm.vec3(2.5, 3.78, -2.5), glm.vec3(0.18, 0.06, 0.18), (0.3, 0.3, 0.3))  # Housing/mount (normal shaded)
    spot_color = ON_GLOW["spot"] if spot_light_on else OFF_GLOW["spot"]
    draw_cube(program, glm.vec3(2.5, 3.72, -2.5), glm.vec3(0.1, 0.03, 0.1), spot_color, emissive=True)  # Bulb (glows)

    # ── Directional light indicator: samner deyal e, janla-r upore — "sunlight" on/off dekhanor jonno ──
    dir_color = ON_GLOW["dir"] if dir_light_on else OFF_GLOW["dir"]
    draw_cube(program, glm.vec3(0.0, 3.85, -3.85), glm.vec3(0.5, 0.15, 0.05), dir_color, emissive=True)

# ── Main Setup & Loop ─────────────────────────────────────────────────────────
def compile_shader(src, shader_type):
    shader = glCreateShader(shader_type)
    glShaderSource(shader, src)
    glCompileShader(shader)
    return shader

def main():
    global delta_time, last_frame

    if not glfw.init(): return
    glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 3)
    glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 3)
    glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)

    window = glfw.create_window(900, 700, "Full Bedroom Design - Interactive Lighting", None, None)
    glfw.make_context_current(window)
    glfw.set_cursor_pos_callback(window, mouse_callback)
    glfw.set_key_callback(window, key_callback)          # J/K/L light toggle etar madhome dhora hocche.
    glfw.set_input_mode(window, glfw.CURSOR, glfw.CURSOR_DISABLED)
    glEnable(GL_DEPTH_TEST)

    vs = compile_shader(VERTEX_SHADER, GL_VERTEX_SHADER)
    fs = compile_shader(FRAGMENT_SHADER, GL_FRAGMENT_SHADER)
    program = glCreateProgram()
    glAttachShader(program, vs)
    glAttachShader(program, fs)
    glLinkProgram(program)

    vao = glGenVertexArrays(1)
    vbo = glGenBuffers(1)
    ebo = glGenBuffers(1)

    glBindVertexArray(vao)

    glBindBuffer(GL_ARRAY_BUFFER, vbo)
    glBufferData(GL_ARRAY_BUFFER, vertices.nbytes, vertices, GL_STATIC_DRAW)

    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ebo)
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, indices.nbytes, indices, GL_STATIC_DRAW)

    stride = FLOATS_PER_VERTEX * ctypes.sizeof(ctypes.c_float)
    # location 0: position (prothom 3 ta float)
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, stride, ctypes.c_void_p(0))
    glEnableVertexAttribArray(0)
    # location 1: normal (porer 3 ta float)
    glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, stride, ctypes.c_void_p(3 * ctypes.sizeof(ctypes.c_float)))
    glEnableVertexAttribArray(1)

    projection = glm.perspective(glm.radians(45.0), 900 / 700, 0.1, 100.0)

    # ── Light-er fixed properties (position/direction/color) ──────────────────
    point_light_pos = glm.vec3(-2.7, 3.75, -2.0)        # Bed-er upore tube light.
    point_light_color = glm.vec3(1.0, 0.95, 0.85)

    spot_light_pos = glm.vec3(2.5, 3.75, -2.5)          # Computer table-er upore spot light.
    spot_light_dir = glm.vec3(0.0, -1.0, 0.0)           # Sozha niche mukh kora.
    spot_light_color = glm.vec3(1.0, 1.0, 1.0)
    spot_inner_cutoff = math.cos(math.radians(15.0))
    spot_outer_cutoff = math.cos(math.radians(25.0))

    dir_light_dir = glm.normalize(glm.vec3(-0.4, -1.0, 0.35))  # Janla diye asha "sunlight" er moton.
    dir_light_color = glm.vec3(1.0, 0.95, 0.8)

    while not glfw.window_should_close(window):
        current_frame = glfw.get_time()
        delta_time = current_frame - last_frame
        last_frame = current_frame

        glfw.poll_events()
        process_input(window)

        glClearColor(0.02, 0.02, 0.03, 1.0)
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        glUseProgram(program)

        view = glm.lookAt(camera_pos, camera_pos + camera_front, camera_up)
        glUniformMatrix4fv(glGetUniformLocation(program, "view"), 1, GL_FALSE, glm.value_ptr(view))
        glUniformMatrix4fv(glGetUniformLocation(program, "projection"), 1, GL_FALSE, glm.value_ptr(projection))
        glUniform3f(glGetUniformLocation(program, "viewPos"), *camera_pos)

        # ── Protita frame-e light uniform-gulo update kora (J/K/L er bortoman state onujayi) ──
        glUniform1i(glGetUniformLocation(program, "dirLightOn"), int(dir_light_on))
        glUniform3f(glGetUniformLocation(program, "dirLightDirection"), *dir_light_dir)
        glUniform3f(glGetUniformLocation(program, "dirLightColor"), *dir_light_color)

        glUniform1i(glGetUniformLocation(program, "pointLightOn"), int(point_light_on))
        glUniform3f(glGetUniformLocation(program, "pointLightPos"), *point_light_pos)
        glUniform3f(glGetUniformLocation(program, "pointLightColor"), *point_light_color)

        glUniform1i(glGetUniformLocation(program, "spotLightOn"), int(spot_light_on))
        glUniform3f(glGetUniformLocation(program, "spotLightPos"), *spot_light_pos)
        glUniform3f(glGetUniformLocation(program, "spotLightDirection"), *spot_light_dir)
        glUniform3f(glGetUniformLocation(program, "spotLightColor"), *spot_light_color)
        glUniform1f(glGetUniformLocation(program, "spotInnerCutOff"), spot_inner_cutoff)
        glUniform1f(glGetUniformLocation(program, "spotOuterCutOff"), spot_outer_cutoff)

        glBindVertexArray(vao)

        # ── Rendering All Components ──
        draw_room(program)
        draw_window_left(program)
        draw_window_front(program)
        draw_ac(program)
        draw_bed(program)
        draw_table_and_chair(program)
        draw_computer(program)
        draw_almari(program)
        draw_light_fixtures(program)
        # ────────────────────────────────

        glfw.swap_buffers(window)

    glfw.terminate()

if __name__ == "__main__":
    main()



#run: py E:\DIU\11th\CSE-406_LAB\bedroom_light.py    