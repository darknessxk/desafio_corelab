# CoreLab Challenge

## Introduction

This is a simple project for applying to [CoreLab](https://github.com/corelabbr/corelab-challenge-web-app-php)
But maybe ill implement some extra features to make it more interesting and challenging.

Just for the sake of the challenge and to make it more interesting or maybe someone use it
as a base project for something else in the future (please, let me know if you do).

## Installation

1. Clone this repository
2. Run `sail up -d`
3. Access `http://localhost:8000/docs` in your browser to check api docs

## API

The full API documentation can be found at `http://localhost:8000/docs`
or a proper openapi.yaml can be found at folder `public/docs`

The base url for the api is `http://localhost:8000/api/`

## Tests

To run tests, you can use the following command:

```bash
sail test
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
