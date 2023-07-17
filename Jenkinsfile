pipeline {
  agent any
  stages {
    stage('Check-out') {
      steps {
        echo 'hello and welcome to Ci/CD'
      }
    }

    stage('Test') {
      parallel {
        stage('Test') {
          steps {
            echo 'Test 1 Running'
          }
        }

        stage('Test 2') {
          steps {
            echo 'Test 2'
          }
        }

      }
    }

    stage('Build') {
      steps {
        echo 'Npm Start'
      }
    }

    stage('Git') {
      steps {
        echo 'Git Login'
      }
    }

    stage('Dockerize') {
      steps {
        echo 'docker running'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy success'
      }
    }

  }
}