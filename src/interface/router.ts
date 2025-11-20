import { Router } from "express";

export interface IApplicationRoute {
  path: string;
  route: Router;
}
