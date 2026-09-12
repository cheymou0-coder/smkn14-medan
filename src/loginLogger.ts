// loginLogger.ts

export interface LoginLogEntry {
  id: string;
  role: string;
  details: string;
  timestamp: string;
}

const LOG_STORAGE_KEY = "smkn14_login_audit_logs";

/**
 * Mencatat aktivitas login pengguna baru ke sistem/file log lokal
 */
export function recordLoginLog(role: string, details: string): void {
  try {
    const existingLogs = getLoginLogs();
    const newLog: LoginLogEntry = {
      id: Date.now().toString(),
      role,
      details,
      timestamp: new Date().toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "medium",
      }),
    };

    const updatedLogs = [newLog, ...existingLogs];
    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(updatedLogs));

    // Opsional: Menampilkan jejak log ke konsol developer (simulasi pencatatan file sistem)
    console.log(
      `[SYSTEM LOG FILE]: Tercatat login baru -> Role: ${role} | Info: ${details}`,
    );
  } catch (error) {
    console.error("Gagal mencatat log login:", error);
  }
}

/**
 * Mengambil seluruh daftar riwayat log login yang tersimpan
 */
export function getLoginLogs(): LoginLogEntry[] {
  try {
    const data = localStorage.getItem(LOG_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Gagal membaca log login:", error);
    return [];
  }
}

/**
 * Menghapus data log (opsional jika ingin mereset catatan)
 */
export function clearLoginLogs(): void {
  localStorage.removeItem(LOG_STORAGE_KEY);
}
