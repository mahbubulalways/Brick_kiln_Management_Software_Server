export const getRecoveryEmailTemplate = (
  name: string,
  recoveryCode: string,
  expiryTime: string,
) => {
  return `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>পাসওয়ার্ড পুনরুদ্ধার | evatabd</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f3f6f5;
    font-family: 'Nirmala UI', 'SolaimanLipi', Vrinda, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  "
>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background-color:#f3f6f5; padding:35px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
          style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center"
              style="padding:30px 20px; background-color:#039A63;">

              <div style="font-size:30px; font-weight:800; color:#ffffff; letter-spacing:-1px;">
                eva<span style="color:#d7ffeb;">tabd</span>
              </div>

              <p style="margin:8px 0 0; font-size:13px; color:#e7fff3;">
                আপনার বিশ্বস্ত ডিজিটাল সেবা
              </p>

            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding:35px 30px 20px;">

              <h1 style="margin:0 0 18px; font-size:24px; line-height:1.5; color:#172b24; text-align:center;">
                পাসওয়ার্ড পুনরুদ্ধার
              </h1>

              <p style="margin:0 0 14px; font-size:15px; line-height:1.9; color:#374741;">
                প্রিয় <strong>${name}</strong>,
              </p>

              <p style="margin:0 0 22px; font-size:14px; line-height:1.9; color:#52615a;">
                আপনার evatabd অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তনের অনুরোধ পাওয়া গেছে।
                অনুরোধটি সম্পন্ন করতে নিচের ভেরিফিকেশন কোডটি ব্যবহার করুন।
              </p>

              <!-- Recovery Code -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center"
                    style="padding:24px 12px; background-color:#effaf5; border:1px solid #d2f0e2; border-radius:12px;">

                    <p style="margin:0 0 12px; font-size:12px; color:#527363; letter-spacing:1px;">
                      আপনার ভেরিফিকেশন কোড
                    </p>

                    <div style="font-size:36px; line-height:1.4; font-weight:800; letter-spacing:10px; color:#039A63;">
                      ${recoveryCode}
                    </div>

                    <p style="margin:14px 0 0; font-size:13px; color:#52615a;">
                      কোডের মেয়াদ: <strong>${expiryTime} মিনিট </strong>
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="margin-top:24px;">
                <tr>
                  <td style="padding:15px; background-color:#fff8e9; border-left:4px solid #e9a23b; border-radius:5px;">

                    <p style="margin:0 0 6px; font-size:13px; font-weight:bold; color:#805c18;">
                      নিরাপত্তা সতর্কতা
                    </p>

                    <p style="margin:0; font-size:12px; line-height:1.8; color:#755f37;">
                      এই কোডটি কারও সঙ্গে শেয়ার করবেন না। আপনি যদি পাসওয়ার্ড পরিবর্তনের অনুরোধ না করে থাকেন, তাহলে এই ইমেইলটি উপেক্ষা করুন।
                    </p>

                  </td>
                </tr>
              </table>

              <p style="margin:25px 0 0; font-size:13px; line-height:1.8; color:#64716b;">
                আপনার অ্যাকাউন্টের নিরাপত্তা আমাদের কাছে গুরুত্বপূর্ণ।
                নিরাপদে থাকুন, evatabd-এর সঙ্গে থাকুন।
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="padding:22px 20px; background-color:#f8fbf9; border-top:1px solid #e8efeb;">

              <p style="margin:0 0 6px; font-size:12px; color:#52615a;">
                <strong style="color:#039A63;">evatabd</strong> · নিরাপদ ডিজিটাল সেবা
              </p>

              <p style="margin:0; font-size:11px; line-height:1.7; color:#8a9690;">
                এই ইমেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।<br />
                &copy; ${new Date().getFullYear()} evatabd. সর্বস্বত্ব সংরক্ষিত।
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};
