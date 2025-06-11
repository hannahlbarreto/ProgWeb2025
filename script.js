document.addEventListener('DOMContentLoaded', () => {
    const trailSize = 8;
    const trailElements = [];

    document.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;

        document.body.appendChild(trail);

        trailElements.push(trail);

        if (trailElements.length > trailSize) {
            const oldTrail = trailElements.shift();
            oldTrail.remove();
        }
    });
});
