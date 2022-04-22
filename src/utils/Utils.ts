import { User } from "@/model/User";
import { getAuth } from "firebase/auth";

export default class Utils {
  static APP_VERSION = "WELCOME_HOME_VERSION";

  static isIos(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  static isInStandaloneMode(): boolean {
    return (
      "standalone" in window.navigator && (window.navigator as any).standalone
    );
  }

  static showInstallation(): boolean {
    return Utils.isIos() && !Utils.isInStandaloneMode();
  }

  static preventPinchZoom(event: any): void {
    if (event.touches.length > 1) {
      event.preventDefault();
      // event.stopPropagation(); // maybe useless
    }
  }

  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }
}
