const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack 中的所有配置信息都应该写在 module.exports 中
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'bundle.js',
        environment: {
            arrowFunction: false
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        rules: [
            {
                // test 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的 loader
                // use: 'ts-loader',
                use: [
                    {
                        // 配置babel
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定 corejs 版本
                                        "corejs": "3",
                                        // 使用 corejs 方式
                                        "useBuiltIns": "usage" // usage，按需加载
                                    }
                                ]
                            ]
                        }
                    }, 
                'ts-loader'
            ], // 从后往前执行，先都转成 js，再转版本
                // 要排除的文件
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        "loader": "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: '自定义title'
            template: './src/index.html'
        }),
    ],
    //  用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}