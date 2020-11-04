class Rocket {
    constructor(source, id) {
        Object.assign(this, source);
        this.dateCreated = new Date();
        this.id = id;
    }
}


// This class will be used as my rocket collection manager and store
class RocketCollection{
    constructor(){
        this.allRockets = [];
        this.size = this.allRockets.length;
        this.requiredKeys = {
            name: String,
            company: String
        }

        this.create = (data) => {
            let notFulfilled = [];

            // Check if every required key is present and matches the type
            // Go trough all keys and their types in requiredKeys, if key exist go on
            for (const [key, schemaType] of Object.entries(this.requiredKeys)) {
                if(data[key]){
                    // Check if the type is correct
                    if(data[key].constructor != schemaType) notFulfilled.push({keyname: key, error: 'type'});
                }
                else{
                    notFulfilled.push({keyname: key, error: 'empty'});
                }
            }

            // Error message handling
            if(notFulfilled.length != 0){
                // Depending on error type, give a different message
                const wrongType = notFulfilled.filter(obj => obj.error == 'type').map(error => error.keyname);
                const emptyValue = notFulfilled.filter(obj => obj.error == 'empty').map(error => error.keyname);

                let errorMessage = `Following errors occured for Rocket: ${data.name} \n`;

                if(wrongType.length > 0){
                    errorMessage = errorMessage + `Required keys are of wrong type: ${wrongType}`;
                }
                
                if(emptyValue.length > 0){
                    errorMessage = errorMessage + `\n Required keys are empty: ${emptyValue}`;
                }

                throw new Error(errorMessage);
            }

            else{            
                // and create rocket object with given data
                const rocketId = this.allRockets.length + 1;
                this.allRockets.push(new Rocket(data, rocketId));

                return true;
            }
        },
        
        this.remove = (id) => {
            this.allRockets = this.allRockets.filter(rocket => rocket.id != id);
        }

        this.find = (id) => {
            if(id){
                return this.allRockets.find(rocket => rocket.id == id);
            }else{
                return this.allRockets;
            }
        }
    }
}


module.exports = new RocketCollection();
