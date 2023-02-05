#!/bin/sh

npm run cti create './src/@core/application' -- -i '*spec.ts' -b &&
npm run cti create './src/@core/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/@core/infra' -- -i '*spec.ts' -b &&

npm run cti create './src/category/application' -- -i '*spec.ts' -b &&
npm run cti create './src/category/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/category/infra' -- -i '*spec.ts' -b