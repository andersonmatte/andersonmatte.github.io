# Aprender LIBRAS – Landing page

Landing page da Coleção Aprenda LIBRAS (Webmatte), publicada em **https://webmatte.com.br/aprender-libras/**.

## Publicar no GitHub Pages

1. Crie um repositório chamado **`aprender-libras`** na mesma conta/organização em que o site `webmatte.com.br` já está configurado com domínio próprio.
2. Envie todo o conteúdo desta pasta para a branch `main`, na raiz.
3. Em **Settings → Pages**, escolha *Deploy from a branch* → `main` / `(root)`.
4. Como o domínio `webmatte.com.br` já está ligado ao repositório principal, o GitHub publica este repositório automaticamente em `webmatte.com.br/aprender-libras/`. **Não** crie arquivo `CNAME` aqui.

Se o site principal não usar GitHub Pages, basta enviar esta pasta para `/aprender-libras/` no seu servidor.

## Checklist de SEO depois de publicar

- [ ] **robots.txt:** copie o conteúdo de `robots.txt` para o robots.txt da raiz de `webmatte.com.br` (o Google ignora robots.txt em subpastas).
- [ ] **Google Search Console:** adicione a propriedade `webmatte.com.br`, envie `https://webmatte.com.br/aprender-libras/sitemap.xml` e peça a indexação da URL.
- [ ] **Teste de dados estruturados:** valide em https://search.google.com/test/rich-results
- [ ] **Links internos:** coloque um link para `/aprender-libras/` no menu ou rodapé do site principal.
- [ ] **Links da Play Store:** na descrição de cada app na Google Play, inclua o link `https://webmatte.com.br/aprender-libras/` (backlink forte e relevante).
- [ ] **Google Analytics 4 (opcional):** cole a tag do GA4 no `<head>`. Os cliques nos botões da Google Play já disparam o evento `click_google_play`.
- [ ] Atualize o `<lastmod>` do `sitemap.xml` sempre que alterar a página.

## Estrutura

```
index.html                 página completa (HTML + CSS + JS em um arquivo)
assets/img/*.webp          banners otimizados
assets/img/og-aprender-libras.jpg   imagem de compartilhamento (1200×630)
assets/img/favicon.svg
sitemap.xml
robots.txt                 modelo para a raiz do domínio
```
