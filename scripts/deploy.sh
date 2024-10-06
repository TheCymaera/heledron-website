echo "Current working directory: $PWD"


read -p "Enter 'heledron' to deploy: " CONT
if [ "$CONT" = "heledron" ]; then
  echo "Deploying...";
	npm run build && wrangler pages deploy --branch=production
else
	echo "Canceled";
fi