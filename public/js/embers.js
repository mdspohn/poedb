class EmberEffect {
    constructor(canvas, particleCount) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.container = this.canvas.parentNode;

        this.particleCount = particleCount || 100;
        this.particleColors = [
            [128, 17, 0],
            [182, 34, 32],
            [252, 100, 0],
            [250, 192, 0],
            [252, 191, 73]
        ];

        window.addEventListener("resize", () => this.resizeCanvas(), false);
        window.dispatchEvent(new Event('resize'));

        this.particles = [];
        for (let i = 0; i <= this.particleCount; i++) {
            const colorIdx = Math.floor(Math.random() * (this.particleColors.length - 1)),
                  radius = Math.floor(Math.random() * 3);
            const particle = {
                x: 0,
                y: 0,
                rgb: this.particleColors[colorIdx],
                radius: radius
            };
            this.refreshParticle(particle);
            this.particles.push(particle);
        }

        this.update();
    }

    resizeCanvas() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = `rgba(${particle.rgb[0]}, ${particle.rgb[1]}, ${particle.rgb[2]}, ${particle.opacity})`;
        this.ctx.fill();
    }

    refreshParticle(particle) {
        particle.opacity = 0;
        particle.opacityChange = 0.01 * (Math.ceil(Math.random() * 2));
        particle.x = Math.floor(Math.random() * this.canvas.width);
        particle.y = Math.min(this.canvas.height, Math.random() * this.canvas.height);
        particle.xMax = this.canvas.width;
        particle.yMax = this.canvas.height;
        particle.xTravel = Math.random() * 2 - 1; 
        particle.yTravel = 0.5 * particle.radius + (Math.random() * 3 - 1);
    }

    update() {
        requestAnimationFrame(() => this.update());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            if (particle.opacity < 0 || particle.y < 0)
                this.refreshParticle(particle);

            particle.x += particle.xTravel / 2;
            particle.y -= particle.yTravel / 2;
            particle.opacity += particle.opacityChange;

            if (particle.opacity > 1) {
                particle.opacity = 1;
                particle.opacityChange *= -1;
            }

            //rollover the x axis
            if (!(0 < particle.x < particle.xMax))
            particle.x = (particle.x + particle.xMax & particle.xMax)

            //drawCircle(~~this.x, ~~this.y, this.radius, this.rgb + ',' + this.opacity + ')');
            this.drawParticle(particle);
        });
    }
}