# PageSpeed Insights with reporting
Run mobile and desktop performance tests for your deployed site using Google
PageSpeed Insights V2 with tidy reporting for your build process.

## start container

	docker-compose up -d

## stop container

	docker-compose down

## psi
[documentation psi](https://www.npmjs.com/package/psi)

	// run speed test
	docker-compose exec docker-frontend-analisis bash -c 'psi-local <url>'
	// examples
	docker-compose exec docker-frontend-analisis bash -c 'psi-local https://www.unymira.com'
	docker-compose exec docker-frontend-analisis bash -c 'psi-local https://localhost:4200'

## lighthouse
[documentation lighthouse](https://github.com/GoogleChrome/lighthouse)

	// run analyse
	docker-compose exec docker-frontend-analisis bash -c 'lighthouse-local <url>'
