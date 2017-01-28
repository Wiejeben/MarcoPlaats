node {
    stage("Pull") {
        // Pull repository
        git([url: "https://github.com/Wiejeben/MarcoPlaats", branch: env.BRANCH_NAME])
    }

    stage("Build API") {
        // Run the docker build
        sh "cd API/ && docker-compose -p ${env.JOB_BASE_NAME} build"
        sh "cd API/ && docker build -t api-ci -f Dockerfile.test ."
    }

    stage("Test API") {
        // Remove old instance
        sh "cd API/ && docker rm api-server || true"

        // Run test
        sh "cd API/ && docker run --network=database --name api-server api-ci"
    }

    stage("Build Front-end") {
        sh "cd Frontend/ && docker-compose -p ${env.JOB_BASE_NAME} build"
    }

    stage("Deploy") {
        sh "cd API/ && docker-compose -p ${env.JOB_BASE_NAME} stop"
        sh "cd API/ && docker-compose -p ${env.JOB_BASE_NAME} rm -f"
        sh "cd API/ && docker-compose -p ${env.JOB_BASE_NAME} up -d"

        sh "cd Frontend/ && docker-compose -p ${env.JOB_BASE_NAME} stop"
        sh "cd Frontend/ && docker-compose -p ${env.JOB_BASE_NAME} rm -f"
        sh "cd Frontend/ && docker-compose -p ${env.JOB_BASE_NAME} up -d"
    }

    stage("Clean") {
        // Remove unused images and containers
        sh "docker rm -v $(docker ps -a -q -f status=exited)"
        sh "docker rmi $(docker images -f 'dangling=true' -q) || true"
    }
}