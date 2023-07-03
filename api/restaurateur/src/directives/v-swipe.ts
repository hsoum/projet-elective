export default function VSwipe (app: any) {
  const Distance = 15

  app.directive('swipe', {
    beforeMount: (el: any, binding: any) => {
      let onTouch = false
      let touches: any = 0

      el.addEventListener('touchstart', (e: any) => {
        touches = e.touches
        onTouch = true
        el.addEventListener('touchmove', onTouchMove)
      })

      el.addEventListener('touchend', (e: any) => {
        touches = 0
        el.removeEventListener('touchmove', onTouchMove)
      })

      function onTouchMove (e: any) {
        if (onTouch) {
          const mTouches = e.touches

          if (touches[0].clientX - mTouches[0].clientX > Distance) {
            binding.value('left')
            onTouch = false
          } else if (touches[0].clientX - mTouches[0].clientX < -Distance) {
            binding.value('right')
            onTouch = false
          }
          if (touches[0].screenY - mTouches[0].screenY > Distance) {
            binding.value('up')
            onTouch = false
          } else if (touches[0].screenY - mTouches[0].screenY < -Distance) {
            binding.value('down')
            onTouch = false
          }
          touches = mTouches
        }
      }
    },
  })
}
