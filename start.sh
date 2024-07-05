#!/bin/sh

echo "Running npm install"
npm install
echo "Running migration"
npx prisma migrate dev --name initial_migration
echo "Running build"
npm run build
echo "Running started"
npm run start
