import { UserResponse } from "@supabase/supabase-js";
import { Request } from "express";

export type RequestWithAuthUser = Request & { user?: UserResponse["data"]["user"] };
