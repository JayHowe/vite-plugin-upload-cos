# vite-plugin-upload-cos
vite-plugin-upload-cos,  vite插件，兼容rollup插件，cos插件， 打包构建完成之后将资源上传到cos， 可以在vite或者rollup中使用


## 安装
```bash
npm i -D vite-plugin-upload-cos
```

```tsx
// vite.config.ts
import uploadCosPlugin from 'vite-plugin-upload-cos'

export default {
   build: {
    rollupOptions: {
      plugins: [uploadCosPlugin({
        cosBaseDir: `viteh5`, /* 存放到cos的地址， 这里存放到viteh5文件夹里 */
        bucket: 'test-jayhowe-1111111111', /* 上传cos的 bucket */
        region: 'ap-guangzhou', /* 上传cos的 region */
        SecretId: 'xxx',  /* 上传cos的 SecretId */
        SecretKey: 'xxx', /* 上传cos的 SecretKey */
        uploadDir: 'dist', /* 可选项，不填则默认上传dist文件夹里面的全部文件到cos */
        excludes: [
          /\.map$/,/**忽略map文件 */
          'index.html', /* 可选项，忽略上传到cos的文件， 不填则默认上传指定文件夹的全部文件 */
        ]
    })],
    },
  },
}
```


<!-- ## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p> -->

## License

[MIT](./LICENSE) License © 2021 [JayHowe](https://github.com/jayhowe)


