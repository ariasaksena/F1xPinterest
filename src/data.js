import profile from './assets/profile.jpg'
import coverVip from './assets/cover-vip.jpg'
import coverHotel from './assets/cover-hotel.jpg'
import coverOutfit from './assets/cover-outfit.jpg'
import itemHospitality from './assets/item-hospitality.jpg'
import itemBellagio from './assets/item-bellagio.jpg'
import itemJersey from './assets/item-jersey.jpg'
import itemJacket from './assets/item-jacket.jpg'
import itemHat from './assets/item-hat.jpg'

export const account = {
  name: 'F1 Las Vegas GP',
  eyebrow: 'Official Race Guide',
  location: 'Las Vegas, Nevada',
  tagline: 'Everything you need for race weekend — in one place.',
  disclaimer: 'This page contains affiliate links and may earn commissions.',
  photo: profile,
}

export const guides = [
  {
    slug: 'vip-weekend',
    number: '01',
    title: '3-Day VIP Weekend',
    category: 'Hospitality',
    cover: coverHotel,
    blurb: 'Three days trackside — premium hospitality and the best of the Strip.',
    items: [
      {
        img: itemHospitality,
        brand: 'F1 Experiences',
        name: 'Trackside Tavern Hospitality',
        price: 'View rates',
        url: 'https://tickets.formula1.com/en/ah-59007-las-vegas-additional-hospitality/hospitality-trackside-tavern',
      },
    ],
  },
  {
    slug: 'hotel-guide',
    number: '02',
    title: 'Hotel Guide',
    category: 'Where to Stay',
    cover: coverVip,
    blurb: 'Where to stay on and around the Strip for race weekend.',
    items: [
      {
        img: itemBellagio,
        brand: 'MGM Resorts',
        name: 'Bellagio Las Vegas',
        price: 'View rates',
        url: 'https://bellagio.mgmresorts.com/en/hotel.html',
      },
    ],
  },
  {
    slug: 'raceday-outfit',
    number: '03',
    title: 'Raceday Outfit Inspo',
    category: 'What to Wear',
    cover: coverOutfit,
    blurb: 'Paddock-ready looks to wear on race day.',
    items: [
      {
        img: itemJersey,
        brand: 'Mitchell & Ness',
        name: 'Oscar Piastri Legacy Jersey',
        price: '$175',
        url: 'https://f1store4.formula1.com/en/mclaren-f1-team/mclaren-mitchell-and-ness-oscar-piastri-legacy-jersey/t-32757517+p-919936369187866+z-9-2016870930',
      },
      {
        img: itemJacket,
        brand: 'McLaren \u00D7 M&N',
        name: 'Las Vegas GP Track Jacket',
        price: '$182',
        url: 'https://f1store4.formula1.com/en/mclaren-f1-team/mclaren-x-mitchell-and-ness-las-vegas-gp-track-jacket/t-10425373+p-570080715650422+z-9-1404164216',
      },
      {
        img: itemHat,
        brand: 'Formula 1',
        name: 'F1 \u00D7 Snoopy Peanuts 5-Panel Hat',
        price: '$55',
        url: 'https://f1store4.formula1.com/en/formula-1-merchandise/f1-x-snoopy-peanuts-5-panel-hat/t-65987743+p-35225880770863+z-8-1707313960',
      },
    ],
  },
]

export const getGuide = (slug) => guides.find((g) => g.slug === slug)
