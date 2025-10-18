//이미지 스크롤 고정
  const canvas = document.getElementById('screen');
  const context = canvas.getContext('2d');
  const img = new Image();
  const frameCount = 10; // 총 프레임 개수 (0~10)

  // 캔버스 크기를 부모 요소에 맞춤
  function resizeCanvas() {
    const parent = document.getElementById('img_sequence');
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }

  // 특정 프레임 불러오기
  function player(num) {
    img.src = `./asset/images/sequence/selfImg_frame${num}.png`;
  }

  // 이미지 로드되면 그리기
  img.addEventListener('load', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  });

  // GSAP ScrollTrigger
  gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-intro",
      start: "top top",
      end: "+=1000", 
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * frameCount);
        player(frameIndex);
      }
    }
  });

  // 초기 실행
  window.addEventListener('load', () => {
    resizeCanvas();
    player(0); // 첫 프레임
  });

  // 리사이즈 대응
  window.addEventListener('resize', resizeCanvas);
