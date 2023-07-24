const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');

/**
 * vite-plugin-upload-cos 静态资源上传cos rollup插件
 * @SecretId String 腾讯云cos SecretId
 * @SecretKey String 腾讯云cos SecretKey
 * @bucket String 腾讯云cos bucket
 * @region String 腾讯云cos region
 * @cosBaseDir String 腾讯云cos存放的资源的地址
 * @uploadDir String 选填，腾讯云cos存放的资源的地址
 * @excludes []String 选填，不需要上传的文件数组
 * 
 * @returns 
 */
function upload2Cos({
  SecretId,
  SecretKey,
  bucket,
  region,
  cosBaseDir,
  uploadDir = 'dist',
  excludes = []
}) {
  const cosObject = new COS({
    SecretId,
    SecretKey,
  });
  return {
    name: 'vite-plugin-upload-cos',
    async writeBundle(_option, bundles) {
      const uploadfiles = Object.keys(bundles).filter((item) => {
        for (let i = 0; i < excludes.length; ++i) {
          const matcher = excludes[i];
          if ((matcher instanceof RegExp && matcher.test(item)) || matcher === item) {
            console.log(false, item);
            return false;
          }
        }
        return true
      });
      function upload2CosPromise({ url }) {
        return new Promise((resolve) => {
          cosObject.putObject(
            {
              Bucket: bucket,
              Region: region,
              Key: `${cosBaseDir}/${url}`,
              StorageClass: 'STANDARD',
              Body: fs.createReadStream(`./${uploadDir}/${url}`),
              onProgress: function () {
                console.log(`\x1B[36m[vite-plugin-upload-cos]Uploading ${url}\x1B[0m`)
              }
            },
            function (err) {
              if (err) {
                resolve(`Upload ${url} error: ${JSON.stringify(err)}`);
              } else {
                resolve(`${url} Uploaded!`);
              }
            },
          );
        });
      }

      const files = [];
      uploadfiles.forEach((item) => {
        const promiseFile = upload2CosPromise({
          url: item,
        });
        files.push(promiseFile);
      });
      Promise.all(files)
        .then((res) => {
          console.log('[vite-plugin-upload-cos]Upload to COS finish: ', res);
        })
        .catch((err) => {
          console.log('[vite-plugin-upload-cos]Upload to COS fails: ', err);
        });
    },
  };
}

module.exports = upload2Cos;