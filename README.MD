# Introduction

Just simple boilerplate for Nextjs with Prismic.

# Features

- Nextjs
- TypeScript
- Prismic Integration
  - Single Page
  - Archive Page
  - Single Archive Page
  - Multilanguage
- Tailwind CSS

# Installation

Clone this repository and move to the folder

```
git clone https://github.com/gusdarma/next-prismic-typescript.git
cd next-prismic-typescript
```

Install yarn

```
yarn install
```

Create [Prismic Project](https://prismic.io/). And then create Custom Types, from this boilerplate you can follow to create 2 Custom Types: **Page** and **Blog**.

## Custom Type Page

1. **Main Tab**. On main tab, add _is_archive_ field to define the pages is archive or not archive.
   ![Prismic - Custom types Pages](/public/readme/page-main.png)
2. Add **Meta Tab** to define meta for each pages. on meta tab, add _slug_ field as uid to define slug for each pages. And also add _meta_title_, _meta_description_ and _meta_image_ for SEO purpose.
   ![Prismic - Custom types Blogs](/public/readme/page-meta.png)

## Custom Type Blog

1. **Main Tab**. On main tab, add _title_ field to give Title for each blogs.
   ![Prismic - Custom types Pages](/public/readme/blog-main.png)
2. Add **Meta Tab** to define meta for each pages. on meta tab, add _slug_ field as uid to define slug for each blogs. And also add _meta_title_, _meta_description_ and others for SEO purpose.
   ![Prismic - Custom types Blogs](/public/readme/blog-meta.png)

## Env File

On your Prismic go to Settings > API & Security > Content API. Copy your API endpoint, the API content seems like this : https://prismic-next-boilerplate.prismic.io/api/v2

On your root roject folder, rename **.env.sample** to **.env**

```
mv .env.sample .env
```

Open your .env file and change "NEXT_PUBLIC_PRISMIC_API" with your own.

## Run the Project

```
yarn dev
```

See your peoject on http://localhost:3000

Good luck :)