# arduino-servo-web

Control a servo motor through a web app

## Schema

![Schema](./images/schema.jpg)

## Setting

1. Connect the Arduino to the PC
2. Install dependencies in `backend` and `frontend` with:
  ```sh
  yarn
  ```
3. Start backend server
  ```sh
  cd backend
  yarn start
  ```
4. Start React App
  ```sh
  cd frontend
  yarn dev
  ```

## Usage

* From React App
* From Custom CLI
  * Get degrees
    ```sh
    cd backend
    yarn cli -g
    ```
  * Set degrees
    ```sh
    cd backend
    yarn cli -s <degToSet>
    ```
* With curl
  * Get degrees
    ```sh
    curl "http://localhost:3000/"
    ```
  * Set degrees
    ```sh
    curl -x POST "http://localhost:3000/[degToSet]"
    ```

## Screenshots

![Schema](./images/screenshot.png)
