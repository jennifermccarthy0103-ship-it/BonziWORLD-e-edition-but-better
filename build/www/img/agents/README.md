# build/www/img/agents

This folder contains 8 WebP placeholder images for agents: red.webp, orange.webp, yellow.webp, green.webp, blue.webp, purple.webp, cyan.webp, black.webp.

If you want to generate them locally instead of committing binaries, run the generator script:

```bash
# from repo root
npm install sharp
node tools/generate-agent-webps.js
```

The generator writes 64×64 solid-color `.webp` files to this directory.
