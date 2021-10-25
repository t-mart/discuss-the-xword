src-paths = get_posts.py

.PHONY: all
all: isort black flake8 pylint mypy test

.PHONY: mypy
mypy:
	mypy $(src-paths)

.PHONY: isort
isort:
	isort $(src-paths)

.PHONY: flake8
flake8:
	flake8 $(src-paths)

.PHONY: pylint
pylint:
	pylint $(src-paths)

.PHONY: black
black:
	black $(src-paths)

.PHONY: sync-requirements
sync-requirements: compile-requirements compile-requirements-dev
	pip-sync requirements.txt requirements-dev.txt

.PHONY: compile-requirements
compile-requirements:
	pip-compile requirements.in

.PHONY: compile-requirements-dev
compile-requirements-dev:
	pip-compile requirements-dev.in