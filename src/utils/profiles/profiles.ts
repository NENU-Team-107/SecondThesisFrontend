import { studentProfile } from "@/api/apis/student";
import { useAccessTokenStore } from "@/store/accessToken";
import { useSiteInfoStore } from "@/store/siteInfo";
import { useStudentStore } from "@/store/student";
import type { ProfileDetail, StudentProfileResp } from "@/types/apis/student";
import axios from "axios";
import { ElMessage } from "element-plus";
import { commonCommits } from "./../../api/apis/common";

// 图片缓存相关函数
const getCachedImage = (photoPath: string): string | null => {
  const cached = localStorage.getItem(`photo_${photoPath}`);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    // 缓存24小时
    if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
      return data;
    }
    // 清除过期缓存
    localStorage.removeItem(`photo_${photoPath}`);
  }
  return null;
};

const setCachedImage = (photoPath: string, base64Data: string) => {
  const cacheData = {
    timestamp: Date.now(),
    data: base64Data,
  };
  localStorage.setItem(`photo_${photoPath}`, JSON.stringify(cacheData));
};

const fetchProfile = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentProfile()
      .then((response) => {
        const res = response.data as StudentProfileResp;
        console.log(res);
        if (res.code !== 0) {
          ElMessage.error(res.message);
          reject(new Error(res.message));
          return;
        }
        const profile = res.profile as ProfileDetail;

        if (profile.photo.startsWith("./")) {
          // 尝试从缓存获取图片
          const cachedImage = getCachedImage(profile.photo);
          if (cachedImage) {
            profile.photo = cachedImage;
            useStudentStore().setProfile(profile);
            resolve();
            return;
          }

          // 缓存未命中，从服务器获取
          axios
            .get(
              `${useSiteInfoStore().getBaseUrl()}/student/getPhoto?photo=${profile.photo}`,
              {
                responseType: "arraybuffer",
                headers: {
                  Authorization: useAccessTokenStore().getAccessToken(),
                },
              },
            )
            .then((response) => {
              const base64String = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  "",
                ),
              );
              const imageData = `data:image/png;base64,${base64String}`;

              // 缓存图片数据
              setCachedImage(profile.photo, imageData);

              profile.photo = imageData;
              useStudentStore().setProfile(profile);
              resolve();
            })
            .catch((error) => {
              ElMessage.error("获取照片失败");
              useStudentStore().setProfile(profile);
              reject(error);
            });
        } else {
          useStudentStore().setProfile(profile);
          resolve();
        }
      })
      .catch((error) => {
        ElMessage.error("获取个人信息失败");
        reject(error);
      });
  });
};

export { fetchProfile };
