import { commonCommits } from './../../api/apis/common';
import { studentProfile } from '@/api/apis/student';
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useStudentStore } from '@/store/student';
import { StudentProfileResp, ProfileDetail } from '@/types/apis/student';
import axios from 'axios';
import { ElMessage } from 'element-plus';
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
        let profile = res.profile as ProfileDetail;

        if (profile.photo.startsWith('./')) {
          axios
            .get(`${useSiteInfoStore().getBaseUrl()}/student/getPhoto?photo=${profile.photo}`, {
              responseType: 'arraybuffer',
              headers: {
                Authorization: useAccessTokenStore().getAccessToken(),
              },
            })
            .then((response) => {
              const base64String = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
              profile.photo = `data:image/png;base64,${base64String}`;

              useStudentStore().setProfile(profile);
              resolve();
            })
            .catch((error) => {
              ElMessage.error('获取照片失败');
              useStudentStore().setProfile(profile);
              reject(error);
            });
        } else {
          useStudentStore().setProfile(profile);
          resolve();
        }
      })
      .catch((error) => {
        ElMessage.error('获取个人信息失败');
        reject(error);
      });
  });
};

export { fetchProfile }