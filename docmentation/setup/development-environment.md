## Set up SCS PM Development Environment

# Pre-requisites:

- Install node based on the OS of machine from https://nodejs.org/en/download/. Along with node npm will be installed too. Npm is a node package manager.
- Install VS code from https://code.visualstudio.com/download.
- Clone the git repository from: https://github.com/amittkSharma/scs_predictive_maintenance.git, if there is some troubles in accessing the repository please contact the administrator.


# Getting Started

- Open the terminal and navigate to the "packages" folder and execute "code ." command.
- It will open the project in VS Code and one can see all the three packages name "scs-pm-client", "scs-pm-core" and "scs-pm-server".
- Open the terminal with-in the VS Code and execute "npm install", this command will install all the dependencies related to all three packages.
- Once the node modules are installed, then open 2 separate terminals with VS Code and navigate to the scs-pm-client and scs-pm-server packages respectively.
- With in the terminal of "scs-pm-server", execute the command "npm run build && npm start". This command will compile the server package and start. Once started the server will start listening at port 8080.
- With in the terminal of "scs-pm-client", execute the command "npm start". This command will serve the client on the browser. Once started the client can easily be reached in browser via "http://localhost:3000".

# Verification

- One can verify the installation of node by using the command "node -v" in terminal, it will give the latest version of node installed on the machine.
- One can verify the installation of npm by using the command "npm -v" in terminal, it will give the latest version of npm installed on the machine.
