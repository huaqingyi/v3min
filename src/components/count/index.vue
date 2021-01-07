<template>
    <span class="p-count">{{ printVal }}</span>
</template>

<script lang="ts">
import { nextTick } from 'vue';
import { Component, prop, Vue, WithDefault } from 'vue-pandora-decorators';

export class Props {
    public startVal: WithDefault<string | number>;
    public endVal: WithDefault<string | number>;
    public speed: WithDefault<string | number>;
    public decimals: WithDefault<string | number>;
    public isReverse: WithDefault<string | boolean>;

    constructor() {
        this.startVal = prop<string | number>({ type: [String, Number], default: '' });
        this.endVal = prop<string | number>({ type: [String, Number], default: '' });
        this.speed = prop<string | number>({ type: [String, Number], default: 20 });
        this.decimals = prop<string | number>({ type: [String, Number], default: 0 });
        this.isReverse = prop<string | boolean>({ type: [String, Boolean], default: false });
    }
}

@Component({ name: 'p-count' })
export default class extends Vue.with(Props) {
    public start: number;
    public end: number;
    public formatSpeed: number;

    public get formatDecimals() {
        return Number(this.decimals > 0 ? this.decimals : 0);
    }

    public get decimalsLen() {
        return Number(Math.pow(10, this.formatDecimals));
    }

    public get printVal() {
        return Number((
            Number(this.start * this.decimalsLen) / this.decimalsLen
        ).toFixed(this.formatDecimals));
    }

    constructor() {
        super(arguments);
        this.start = 0;
        this.end = 0;
        this.formatSpeed = 0;
    }

    public mounted() {
        this.start = +this.startVal;
        this.end = +this.endVal;
        this.formatSpeed = +this.speed || 5;
        nextTick(() => {
            this.accumulativeMachine();
        });
    }

    public accumulativeMachine() {
        setTimeout(() => {
            if (this.isReverse) {
                let decimalss = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
                let formatSpeeds = this.formatSpeed / this.decimalsLen + decimalss;
                this.start = this.start - formatSpeeds;
                if (this.printVal <= this.end) {
                    this.start = this.end;
                    return;
                }
            } else {
                let decimalss = this.formatDecimals === 0 ? 0 : 1 / this.decimalsLen;
                let formatSpeeds = this.formatSpeed / this.decimalsLen + decimalss;
                this.start = this.start + formatSpeeds;
                if (this.printVal >= this.end) {
                    this.start = this.end;
                    return;
                }
            }
            this.accumulativeMachine();
        }, 8);
    }
}
</script>
<style>
.p-count {
    font-size: 23px;
}
</style>