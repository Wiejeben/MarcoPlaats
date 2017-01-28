node {
    stage('Pull') {
        // Pull repository
        git([url: 'https://github.com/Wiejeben/MarcoPlaats', branch: env.BRANCH_NAME])
    }

    stage('Build API') {
        // Run the docker build
        sh 'cd API/ && docker-compose build'
        sh 'cd API/ && docker build -t api-ci -f Dockerfile.test .'
    }

    stage('Test API') {
        // Remove old instance
        sh 'cd API/ && docker rm api-server || true'

        // Run test
        sh 'cd API/ && docker run --network=database --name api-server api-ci'
    }

    stage('Build Front-end') {
        sh 'cd Frontend/ && docker-compose build'
    }

    stage('Deploy') {
        sh 'cd API/ && docker-compose stop'
        sh 'cd API/ && docker-compose rm -f'
        sh 'cd API/ && docker-compose up -d'

        sh 'cd Frontend/ && docker-compose stop'
        sh 'cd Frontend/ && docker-compose rm -f'
        sh 'cd Frontend/ && docker-compose up -d'
    }

    stage('Clean') {
        // Remove unused images and containers
        sh 'docker rm -v $(docker ps -a -q -f status=exited)'
        sh 'docker rmi $(docker images -f "dangling=true" -q)'
    }
}