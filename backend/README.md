# CoreLab Challenge - Backend

## Installation

1. Clone this repository
2. Run `sail up -d` or `docker-compose up -d` to start the containers
3. Run `saul artisan jwt:generate` to generate the jwt secret or
   - `docker-compose exec laravel.test php artisan jwt:generate`
4. Run `sail artisan migrate --seed` to run the migrations and seed the database or 
   - `docker-compose exec laravel.test php artisan migrate --seed`
5. Access `http://localhost:8000/docs` in your browser to check api docs

## API

The full API documentation can be found at `http://localhost:8000/docs`
or a proper openapi.yaml can be found at folder `public/docs`

The base url for the api is `http://localhost:8000/api/`

## Tests

To run tests, you can use the following command:

```bash
sail test
```

or

```bash
docker-compose exec laravel.test php artisan test
```

Coverage still a bit low but do what it needs to do.

## Improvements & Enhancements

- [ ] Add support for api versioning
- [ ] Add more tests
- [ ] Add more error handling
- [ ] Add support for todo visibility
- [ ] Add support for todo priority
- [ ] Add support for todo tags
- [x] Add support for todo due date
- [ ] Add support for todo notes
- [ ] Add support for todo subtasks
- [ ] A few extra security measures (like rate limiting)
- [ ] Add support for smart caching using Redis + ETag headers

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
