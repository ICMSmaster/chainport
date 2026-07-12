// 관리자 화면 진입용 비밀번호입니다. 원하는 값으로 바꾸셔도 됩니다.
export const ADMIN_PASSWORD = "chainport1234";

export const ADMIN_SESSION_KEY = "chainport-admin-auth";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function setAdminAuthenticated() {
  window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function clearAdminAuthenticated() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}