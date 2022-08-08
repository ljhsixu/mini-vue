/*
 * @Author: ljh 277841643@qq.com
 * @Date: 2022-08-08 17:52:52
 * @LastEditors: ljh 277841643@qq.com
 * @LastEditTime: 2022-08-08 17:54:32
 * @FilePath: /my-mini-vue/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            }
        }], '@babel/preset-typescript'
    ],

};