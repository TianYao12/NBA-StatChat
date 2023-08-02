module.exports = {
    // Other configuration options...
    
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          }],
        },
      ],
    },
  };
  