var pJS_desktop = () => {
    particlesJS('particles-js', {
        particles: {
            color: '#FFC107',
            shape: 'circle',
            opacity: {
                opacity: 1
            },
            size: 4.5,
            size_random: true,
            nb: 150,
            line_linked: {
                enable_auto: true,
                distance: 250,
                color: '#FFC107',
                opacity: 0.5,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 3
            }
        },
        interactivity: {
            enable: true,
            mouse: {
                distance: 200
            },
            detect_on: 'canvas',
            mode: 'grab',
            line_linked: {
                opacity: .5
            },
            events: {
                onclick: {
                    enable: true,
                    mode: 'push',
                    nb: 4
                }
            }
        },
        retina_detect: true
    });
}


/* LAUNCH */


pJS_desktop();
