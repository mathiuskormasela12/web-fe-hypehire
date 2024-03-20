import { atomWithStorage } from "jotai/utils";

export const accessTokenAtom = atomWithStorage('access-token', '')
export const refreshTokenAtom = atomWithStorage('refresh-token', '')