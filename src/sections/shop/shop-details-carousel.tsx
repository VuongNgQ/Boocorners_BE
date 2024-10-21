import type { IProductItem } from 'src/types/product';

import { useEffect } from 'react';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { pxToRem } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Lightbox, useLightBox } from 'src/components/lightbox';
import { Carousel, useCarousel, CarouselThumb, CarouselThumbs } from 'src/components/carousel';

// ----------------------------------------------------------------------

type Props = {
  images?: IProductItem['images'];
};

export function ShopDetailsCarousel({ images }: Props) {
  const mdUp = useResponsive('up', 'md');

  const carousel = useCarousel({
    thumbs: {
      axis: mdUp ? 'y' : 'x',
      slideSpacing: '14px',
      slidesToShow: 3,
    },
  });

  const slides = images?.map((img) => ({ src: img })) || [];

  const lightbox = useLightBox(slides);

  useEffect(() => {
    if (lightbox.open) {
      carousel.mainApi?.scrollTo(lightbox.selected, true);
    }
  }, [carousel.mainApi, lightbox.open, lightbox.selected]);

  return (
    <>
      <div>
        <Box sx={{ mb: 2.5, position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column-reverse',
                md: 'row',
              },
            }}
          >
            <Box
              sx={{
                mr: { xs: 0, md: pxToRem(14) },
                mt: { xs: pxToRem(14), md: 0 },
              }}
            >
              <CarouselThumbs
                ref={carousel.thumbs.thumbsRef}
                options={carousel.options?.thumbs}
                slotProps={{ disableMask: true }}
                sx={{
                  height: 1,
                  width: 1,
                }}
              >
                {slides.map((item, index) => (
                  <CarouselThumb
                    key={item.src}
                    index={index}
                    src={item.src}
                    selected={index === carousel.thumbs.selectedIndex}
                    onClick={() => carousel.thumbs.onClickThumb(index)}
                    sx={{
                      width: { xs: pxToRem(111), md: pxToRem(152) },
                      height: { xs: pxToRem(106), md: pxToRem(167) },
                      borderRadius: 0,
                      ...(index === carousel.thumbs.selectedIndex && {
                        boxShadow: (theme) => `0 0 0 2px #000`,
                      }),
                    }}
                  />
                ))}
              </CarouselThumbs>
            </Box>
            <Carousel
              carousel={carousel}
              sx={{
                width: 1,
                maxWidth: { xs: pxToRem(358), md: pxToRem(444) },
                maxHeight: { xs: pxToRem(290), md: pxToRem(530) },
              }}
            >
              {slides.map((slide) => (
                <Image
                  key={slide.src}
                  alt={slide.src}
                  src={slide.src}
                  ratio={mdUp ? 'auto 444 / 530' : 'autp 358 / 290'}
                  onClick={() => lightbox.onOpen(slide.src)}
                  sx={{ cursor: 'zoom-in', width: 1 }}
                />
              ))}
            </Carousel>
          </Box>
        </Box>
      </div>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}
