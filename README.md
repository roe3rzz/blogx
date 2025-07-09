# blogx

Simple dev setup

## 1. Clone

```zsh
git clone https://github.com/ghjcwrk/blogx.git && cd blogx
```

## 2. Open in DevContainer

Use VS Code + DevContainer or any compatible environment

## 3. (Optional) Trust the local cert

If you want to avoid browser warnings:

- Register `certs/localhost.pem` to your host machine’s trust store

## 4. Start dev server

> This project uses task with z alias

```zsh
z
dev
```

## 5. Access

Open https://localhost in your browser

## 6. Authentication

```zsh
gh auth login

# Place `.gitconfig` at project root

cp .gitconfig ~/.gitconfig

# Receive and place `.env.keys` at project root

z
decrypt
```

---

If you're on Apple Silicon, it probably just works — same as my setup
