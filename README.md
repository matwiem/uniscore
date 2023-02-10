# Uniscore

Compare game statistics between various data brokers.

## Table of contents

- Description
- Requirements
- How to run

## Description

### Server

---

Uniscore let's you compare game data coming in various data formats.

**Supported formats**

- SR
- External

The service compares entities identified by matching gameId coming from distinct sources called *source* and *target* repositories.

### Game data population

Games repositories are populated with data coming from the file system.
The game service will try to parse the files only once during dependency initialization phase.
Configuration is done via setting particular environment variables.

**environment variables**
- `SOURCE_FILE` - path to JSON file used to populate *source* repository
- `TARGET_FILE` - path to JSON file used to populate *target* repository

**constraints**
- `SOURCE_FILE` - **MUST** be in SR format
- `TARGET_FILE` - **MUST** be in External format
- Files can contain a single game object or an array

### Game data comparison

Firstly, data is parsed to a common `Game` class representation and stored in a `GameRepository` implementation `GameRepositoryMemory`.
The comparison is done by an implementation of `Comparer` which produces discrepancies using the JSON Patch ([RFC6902](https://datatracker.ietf.org/doc/html/rfc6902/)) standard.

### Client

---

The UI is minimal. Index page lists all discrepancies. User can navigate to a subject's page by clicking the ID of a single list's entry.

**constraints**

Uses `react-query` to manage application's data. All actions (*resolve*, *ignore*) are done on the query cache - they are not persistent.
The UI components are optimized properly - re-renders that can be avoided will be avoided - however, `react-query` changes referantial equality of the elements after the one that is being deleted ¯\_(ツ)_/¯. This SHOULD be thoroughly investigated.

## Requirements

This project requires:

- [docker](https://docs.docker.com/)

## How to run

### `docker compose up`

Uses ports 3000, 80

Runs the application in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
