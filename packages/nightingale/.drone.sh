# Go to project > Repository and set the branch filter
# Then click on "View Key" and paste it on github
npm -d install

echo "\n> Ensure that the code is warning free"
node_modules/.bin/gulp lint || exit 1

echo "\n> Run tests"
npm test || exit 1

#echo "\n> Run build"
#node_modules/.bin/gulp build || exit 1

echo "\n> Generate docs"
node_modules/.bin/gulp docs || exit 1

echo "\n> Copy docs up to github gh-pages branch"
mv docs docs-tmp
git checkout gh-pages
rm -Rf docs
mv docs-tmp docs
date > date.txt
git add docs
git commit -m"auto commit from drone.io"
git remote set-url origin git@github.com:christophehurpeau/springbokjs-router.git
git push origin gh-pages

