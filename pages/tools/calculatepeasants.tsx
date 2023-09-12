import Image from 'next/image'
import { useEffect, useState } from 'react';

const peasants = (tonnes: number, weight: number): {
    distance: number,
    velocity: number,
    peasants: number,
} => {
    const joules = tonnes * 1e+9;
    const velocity = Math.sqrt(joules/(0.5*weight))/60/60
    // velocity == mi/s the weapon has to travel

    const distance = velocity*6;
    
    const distanceF = velocity*5280; // Getting the amount of feet it has to travel
    const sacrifices = distanceF / 5;

    return {
        distance: distance,
        velocity: velocity,
        peasants: sacrifices,
    }
}


export default function CalculatePeasants() {
    const [tonnes, setTonnes] = useState(0)
    const [weight, setWeight] = useState(0)

    const [sacrifices, setSacrifices] = useState(0)
    const [miles, setMiles] = useState(0)

    useEffect(() => {
        if(tonnes > 0 && weight > 0) {
            const res = peasants(tonnes, weight)
            setSacrifices(res.peasants)
            setMiles(res.distance)
        }
    }, [tonnes, weight])
    
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className='flex flex-col min-h-[50%] justify-between p-24'>
            {/* Here we calculate the amount of peasants we need to match a specific ttnt */}
        
            <input type="number" onChange={(e) => setTonnes(e.target.valueAsNumber)} />
            <input type="number" onChange={(e) => setWeight(e.target.valueAsNumber)} />

            <p>{Math.round(sacrifices)}</p>
            <p>{miles}</p>
        </div>


        
    </main>
  )
}