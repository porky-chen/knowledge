/**
 * 睡眠机制
 * */
const timmer = {
    data(){
        return {
            second:10
        }
    },
    methods:{
        sleep(duration){
            return new Promise(resolve => {
                setTimeout(resolve,duration * 1000)
            })
        },
        async sleepTime(time){
            let timeSecond = time
            this.second = timeSecond

            for(;timeSecond > 0;){
                timeSecond = timeSecond - 1;
                await this.sleep(1)

                this.second = timeSecond
            }
        }
    }
}

export default timmer;
