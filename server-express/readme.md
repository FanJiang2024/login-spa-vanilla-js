#### 生成本地https证书

```bash
mkdir -p ~/.cert
mkcert -key-file ~/.cert/key.pem -cert-file ~/.cert/cert.pem "localhost"
mkcert -install
```