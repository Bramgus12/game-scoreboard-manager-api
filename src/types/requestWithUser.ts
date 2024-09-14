import { UserResponse } from "@supabase/supabase-js";
import { Request } from "express";
import { User } from "../entities/user.entity";

export type RequestWithAuthUser = Request & { authUser?: UserResponse["data"]["user"]; user?: User };
