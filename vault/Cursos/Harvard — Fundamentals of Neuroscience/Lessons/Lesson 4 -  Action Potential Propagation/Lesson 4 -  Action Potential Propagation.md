# Lesson 4 -  Action Potential Propagation

Across these lessons we’ve been building up to the question of how, at the level of a single neuron, electrical signals are generated and sent. We’ve come to understand the electrical properties of the neuron as well as the mechanisms behind the generation of the action potential. If neurons are to communicate, these action potentials need to travel from one neuron to the next, and so it is vital that we understand how these electrical signals propagate down an axon.

In order to understand how these action potentials propagate, we will integrate what we now know about the passive properties of the neuron as well as the unique characteristics of the action potential. Furthermore, the nervous system needs to send signals quickly, and so we will see that there are many different solutions by which this speed can be established, each with its own potential caveats.

---

# Signals in the Nervous System

By the end of the Lesson 1.3, you should understand what the fundamental signals are for the nervous system: action potentials. We’ve investigated their waveform, what channels are responsible for their generation, and we’ve even measured these signals in an organism! This leads us to the next main question: how do these electrical signals travel within and between neurons?

[Vídeo](videos/Signals%20in%20the%20Nervous%20System.mp4)
[Legenda do video em Português](legendas/Signals%20in%20the%20Nervous%20System.txt)

## Question 1
Besides diffusion, cells can also move molecules using motor proteins. Many motor proteins move at about 10 micrometers/second. Given this information, how many hours will it take for a motor protein to transport another molecule a distance of 1 meter? (enter a number, rounded to the nearest hour)
**28 hours**. One meter is \(1{,}000{,}000\) micrometers. At \(10\) micrometers per second, the trip takes \(100{,}000\) seconds, or about \(27.8\) hours. Enter 28.

---

# Electrical Signaling

To send an electrical signal down an axon, in addition to the factors we’ve discussed previously, neurons need to combat the effects of current leaking through the membrane. One way to get around this is simply to make the magnitude of an action potential much larger, but as we’ll see, this may not be the best solution. While you watch this video, consider:

1. What challenges does a neuron need to overcome in order to send an electrical signal?
2. How do neurons propagate signals?

[Vídeo](videos/Electrical%20Signaling.mp4)
[Legenda do video em Português](legendas/Electrical%20Signaling.txt)

## Question 1
Previously, we talked about the differences between active and passive properties of a neuron. Which of the following are examples of active properties that will allow a neuron to propagate an electrical signal down its axon? (Indicate all that apply)
- **There is a threshold voltage at which voltage-gated Na⁺ channels begin a positive feedback loop of channel opening**. Na⁺ entry depolarizes the membrane, opening more Na⁺ channels and regenerating the spike along the axon.
- **Voltage-gated K⁺ channels have slower kinetics in their voltage activation**. Their delayed opening lets the spike rise first, then K⁺ flows out and repolarizes the membrane.

---

# Signals as State

As we previously discussed, neurons propagate the state of depolarization down the axon. It’s important to understand exactly what is meant by the “propagation of a state.” Here we will discuss a fluid dynamics analogy to help us better intuit how these electrical signals are sent. Overall, we will try to think about propagating action potentials by examining the movement of ions and how this movement affects the voltage across patches of membrane. By the end of this video, you should be able to answer these questions:

1. What does it mean to propagate a ‘state of depolarization’?
2. How does an action potential in one region of an axon affect other nearby patches of membrane?

[Vídeo](videos/Signals%20as%20State.mp4)
[Legenda do video em Português](legendas/Signals%20as%20State.txt)


## Question 1
Let’s form some intuition about how an action potential propagates. If one point along the axon is stimulated such that an action potential is initiated, what ion will quickly flow into the neuron?
**Na⁺**. Voltage-gated sodium channels open, and Na⁺ rapidly flows into the axon.

## Question 2
As these ions flow into the axon, this section of the membrane becomes depolarized. In adjacent parts of the membrane, how will the membrane potential change?
**It will depolarize**. Local current spreads along the inside of the axon, making the adjacent membrane’s voltage less negative.

## Question 3
True or False: An action potential in one section of the membrane can cause the initiation of an action potential in adjacent sections of the membrane.
**True**. If the adjacent membrane reaches threshold, its own voltage-gated Na⁺ channels open and generate a new spike there. This is how the action potential propagates.

---

# Getting from Point A to Point B

Now that we have a basic understanding of how action potentials propagate down an axon, let’s build some more intuition. We’ll consider more thoroughly how ions move and which channels open as an action potential propagates, and even how action potentials interact with each other. By the end of this video, see if you can answer these questions:

1. What is the shape of voltage versus distance plot as an action potential passes by a point?
2. Why can action potentials propagate bidirectionally?
3. How do the absolute and relative refractory periods affect how propagating axons interact with each other?

[Vídeo](videos/Getting%20from%20Point%20A%20to%20Point%20B.mp4)
[Legenda do video em Português](legendas/Getting%20from%20Point%20A%20to%20Point%20B.txt)

## Question 1
What will we see on the oscilloscope when you activate the stimulator?
**The characteristic action potential shape but appearing after a delay in time**. The delay is the time it takes for the action potential to travel from the stimulation site to the recording electrode.

[Vídeo](videos/Getting%20from%20Point%20A%20to%20Point%20B%2002.mp4)
[Legenda do video em Português](legendas/Getting%20from%20Point%20A%20to%20Point%20B%2002.txt)

## Question 2
What will a plot of action potential voltage versus distance look like?
**It would look like an action potential that had been flipped left-to-right**. In a voltage-versus-time plot, the rising phase passes the electrode first. In a snapshot plotted along the axon in the direction of travel, that same rising phase is at the front of the spike, on the right, while the falling phase trails behind on the left.

[Vídeo](videos/Getting%20from%20Point%20A%20to%20Point%20B%2003.mp4)
[Legenda do video em Português](legendas/Getting%20from%20Point%20A%20to%20Point%20B%2003.txt)

## Question 3
What do you think would happen if you try to fire action potentials in close succession?

**If you stimulate the neuron again too soon, it won’t fire a second action potential. During the absolute refractory period, too many voltage-gated Na⁺ channels are still inactivated.**

**A little later, during the relative refractory period, a second spike is possible, but it takes a stronger stimulus because some K⁺ channels are still open. Once the neuron recovers, the usual stimulus can trigger another spike.**

## Action Potential Propagation
The simulation below allows you to follow the course of an action potential as it propagates down an axon. Click the yellow lightning bolt - the stimulator button - to initiate an action potential. The graph below the axon shows the membrane potential at different locations along the axon over time. The ocilloscope shows the membrane potential at a location further down the axon. For clarity, we have slowed things down relative to the speed of propagation of an actual action potential, which only lasts a few milliseconds.

If you would prefer to have the readout as sound, you can start the sound and adjust the pitch using the buttons below.

Toggle between the sound representing the action potential at one point at the end of the axon vs. the action potential propagating along the length of the axon below. As a default, the sound represents the action potential at one location; click the checkbox to switch to the sound representation of action potential propagation.

[Imagem](images/Getting%20from%20Point%20A%20to%20Point%20B.png)

## Question 4
1 point possible (graded)
You should have noticed that it's hard to stimulate an action potential. If you look closely, you'll notice that stimulating an action potential is hardest when the membrane potential is hyperpolarized - that is, when it's more negative than baseline.

Why is that the case? This has to do with the refractory period following each action potential. At a molecular level, many of the voltage-gated sodium channels are inactivated - plugged by the ball and chain mechanism we discussed in the last section. When the sodium channels are inactivated, it's impossible to trigger another action potential. We call this the absolute refractory period.

You might have also noticed that it's sometimes hard but not impossible to stimulate an action potential. This happens when the sodium channels are active again but we're still fighting against those extra open potassium channels. This is called the relative refractory period. The timing of these different refractory periods is shown in the image below.

[Imagem](images/Getting%20from%20Point%20A%20to%20Point%20B%2002.png)

Let's do some thought experiments to test our understanding of action potential propagation. What do you predict would happen if we stimulated in the middle of an axon?

**If we stimulate the middle of a resting axon strongly enough to reach threshold, two action potentials will travel away from the stimulation site in opposite directions. One travels toward the axon terminals, and the other travels toward the cell body.**

**Local current spreads to both sides of the stimulation site. The membrane on each side is ready to fire because neither side has just fired. As each spike travels, it leaves refractory membrane behind it.**


[Vídeo](videos/Getting%20from%20Point%20A%20to%20Point%20B%2004.mp4)
[Legenda do video em Português](legendas/Getting%20from%20Point%20A%20to%20Point%20B%2004.txt)

## Question 5
Let’s make one final prediction about the behavior of propagating action potentials. What happens to two colliding action potentials?
**Both action potentials stop when they collide**. Each spike leaves a refractory region behind it. When the spikes meet, the membrane ahead of each one has just been activated by the other, so its voltage-gated Na⁺ channels are still mostly inactivated. Neither spike can propagate past the collision point.

[Vídeo](videos/Getting%20from%20Point%20A%20to%20Point%20B%2005.mp4)
[Legenda do video em Português](legendas/Getting%20from%20Point%20A%20to%20Point%20B%2005.txt)

## Exploiting Collisions
The last example of colliding action potentials is often exploited by researchers. To find out where a neuron projects, or sends its axon, researchers can stimulate in two locations: at their neuron of interest and at the location they think it sends its axon. If stimulation in these two locations leads to no measurable action potential, then it is likely that the two propagating action potentials traveled on the same axon and collided, meaning they ‘canceled out’ as you saw in the video. With this evidence, researchers can conclude information about where a neuron sends its signals!

## Question 6
True or false?: the limitations of action potential propagation keep axons from being more than a few mm long.
**False**. An action potential is regenerated along the axon as voltage-gated Na⁺ channels open in successive regions. This lets the signal travel much farther than a few millimeters.

## Question 7
A researcher stimulates an axon at two locations and measures the membrane voltage at a location in the middle of the stimulation sites. They observe little change in the membrane voltage. This phenomenon is best explained by the:
**Absolute refractory period**. When the two action potentials collide, each runs into membrane that has just fired and whose Na⁺ channels are still inactivated. Both spikes stop at the collision point. An electrode placed exactly where they meet can still record a transient voltage change.

---

# Speeding Up the Action Potential

Recall our discussions of resistance and capacitance from Lesson 2. We can now put these concepts into practice and see how the properties of a neuron affect the speed at which an action potential propagates. Neurons can change their properties to optimize the spread of signals. This is a beautiful example of how the biological and electrical properties of a neuron interact, which will in turn affect how the neuron itself functions. By the end of this video, consider the following questions:

1. What properties affect the axial resistance and membrane capacitance of a neuron?
2. How do axial resistance and membrane capacitance affect action potential propagation?
3. How could you change a neuron in order to maximize action potential speed?

[Vídeo](videos/Speeding%20Up%20the%20Action%20Potential.mp4)
[Legenda do video em Português](legendas/Speeding%20Up%20the%20Action%20Potential.txt)

Below is a diagram of an axon, with a stimulator electrode at one end and a recording electrode, with its output displayed on an oscilloscope, at the other. Click the yellow lightning bolt to trigger an action potential from the stimulator electrode.

You can adjust the axial resistance and capacitance using the sliders. Try to figure out what adjustments will cause propagation of the action potential to speed up, and what will cause it to slow down. To compare your new action potentials to the default values, turn on "race mode" by checking the box. The action potential generated by the default values will be shown in grey, and your action potential will be shown in red.

If you would prefer to have the readout as sound, you can start the sound and adjust the pitch using the buttons below.

## Question 1
What did you find? How do these two parameters need to change in order to speed up the action potential?
**R decreases, C decreases**.
- Lower axial resistance (\(R\)) lets current flow more easily along the inside of the axon.
- Lower membrane capacitance (\(C\)) means less charge is needed to bring the next segment to threshold.
Together, these changes make the action potential propagate faster.

[Vídeo](videos/Speeding%20Up%20the%20Action%20Potential%2002.mp4)
[Legenda do video em Português](legendas/Speeding%20Up%20the%20Action%20Potential%2002.txt)

## Question 2
The propagation velocity of an action potential traveling along an axon depends on: (select all that apply)

- the length constant of the membrane

- the time constant of the membrane

- the number of voltage-gated channels in the membrane

- the axial resistance of the axoplasm

**Select all four.** The length constant describes how far depolarization spreads, and the time constant describes how quickly the membrane responds. The number of voltage-gated channels affects the current available to regenerate the spike, and axial resistance affects how easily current flows along the axon.

## Question 3
If the axon diameter is doubled while the number of ion channels remains the same (membrane resistance is largely unchanged), how will action potential propagation change?
**The speed increases**. Doubling the diameter gives current a wider path through the axon, lowering axial resistance. Depolarizing current reaches the next segment more readily even though membrane resistance is largely unchanged.

## Question 4
1 point possible (graded)
If the axon diameter is doubled while the density of ion channels remains the same (membrane resistance decreases), how will action potential propagation change?
**The speed increases**. At the same channel density, a wider axon has more membrane channels per unit length and therefore lower membrane resistance. But axial resistance drops more sharply than membrane resistance, so the length constant increases and the spike propagates faster.

---

# Giant Axons

As we’ve discussed, there are many factors that affect the speed with which an action potential travels down an axon. One common observation in nature is that some animals use a ‘giant’ axon that allows for very fast conduction of action potentials. The squid giant axon is the system in which two famous neuroscientists, Alan Hodgkin and Andrew Huxley, discovered and studied the currents behind the action potential. As you’ll see in the video, you can even record from a giant axon yourself! As you watch the video, consider:

1. Why does the giant axon allow for fast conduction of an action potential?
2. What disadvantages are there for using a giant axon?

[Vídeo](videos/Giant%20Axons.mp4)
[Legenda do video em Português](legendas/Giant%20Axons.txt)

## Question 1
A common theme of the nervous system is trade-offs. While having a large axon allows for increases in action potential conduction velocity, which of the following may be a detriment to having a large axon? (indicate all that apply)

- The axon takes up a lot of space.
- Larger axons require more energy to maintain a resting potential.
- Larger axons require more voltage-gated Na+ channels.
- More mitochondria are needed to allow cellular processes to occur.

**All four**. For axons of the same length and with similar channel densities, a larger diameter has these trade-offs:
- It takes up more space. A wider axon occupies more tissue volume. pmc.ncbi.nlm.nih.gov
- It can use more energy to maintain the resting potential. More membrane area means more total ion leakage at the same leak density, so ion pumps use more ATP to maintain the ion gradients. pmc.ncbi.nlm.nih.gov
- It needs more voltage-gated Na⁺ channels to maintain the same channel density. The same length of a wider axon has more membrane area. journals.physiology.org
- It can need more mitochondria. Greater energy demand can require more mitochondrial capacity to supply ATP

---

# Myelinated Axons

As we’ve alluded, using a giant axon is not the only, or necessarily the best, solution for increasing action potential conduction velocity. This leads us to the idea of myelin, which forms a fatty insulating sheath around neuronal fibers. Myelin is produced by cells called glia. We can use what we already know about resistance and capacitance to understand how myelin achieves its purpose. While watching this video, consider:

1. What is the difference between a myelin sheath and a ‘node of Ranvier’?
2. How does myelin affect membrane resistance and capacitance?

[Vídeo](videos/Myelinated%20Axons.mp4)
[Legenda do video em Português](legendas/Myelinated%20Axons.txt)

## Question 1
Let’s build intuition for how myelination can be used to help axon conduction velocity. One effect of myelin is that it decreases the number of ion channels in the membrane. This will
**Increase membrane resistance**. Fewer ion channels mean fewer paths for current to leak across the membrane. This helps depolarizing current spread farther along the axon.

## Question 2
Another effect of myelin is that it effectively increases the thickness of the membrane. This will
**Decrease membrane capacitance**. Myelin adds insulating layers, increasing the effective distance between the charges on either side. With lower capacitance, less charge is needed to produce the same change in voltage.

---

# Myelination I

We’ve now arrived at our final discussion of electrical signalling for a single neuron. Throughout Lesson 4 we’ve discussed various properties that neurons can take advantage of in order to speed up action potentials. Simply making a larger axon, though, isn’t always the best or most space-efficient solution. There are often many trade-offs in nature, and various solutions can be developed in different organisms for the same problem. Another elegant solution is the use of myelination, which we will consider here. As you work through this lesson, try to answer these questions:

1. What is myelin and what kind of cells produce it?
2. How does myelin change the passive properties of an axon?
3. What is the importance of the Nodes of Ranvier?
4. How do electrical signals travel differently in a myelinated versus an unmyelinated axon, and what is the phenomenon called “saltatory conduction”?

[Vídeo](videos/Myelination%20I.mp4)
[Legenda do video em Português](legendas/Myelination%20I.txt)

## Question 1
Covering the surface of an axon with myelin increases the conduction velocity of action potentials. Do you think it would be advantageous to cover the entire axon in myelin? Briefly explain your reasoning in the space below.
**No. The axon needs gaps in the myelin called nodes of Ranvier. Current spreads quickly under the myelin and depolarizes the next node, where voltage-gated Na⁺ channels regenerate the action potential. Without those gaps, the voltage change would eventually fade.**

[Vídeo](videos/Myelination%20I%2002.mp4)
[Legenda do video em Português](legendas/Myelination%20I%2002.txt)

## Myelinated Axons
In the interactive below, you can press the stimulator button to activate an action potential, and toggle myelin on and off to see how it affects action potential propagation. Activate "race mode" to see how an action potential in a myelinated axon compares to an action potential in a non-myelinated axon that is identical in every other way.

If you would prefer to have the readout as sound, you can start the sound and adjust the pitch using the buttons below.

Change Pitch Frequencies

Start Sound for Action Potential Stop Sound for Action Potential

Toggle between the sound representing the action potential at one point at the end of the axon vs. the action potential propagating along the length of the axon below. As a default, the sound represents the action potential at one location; click the checkbox to switch to the sound representation of action potential propagation.

[Imagem](images/Myelination%20I.png)

[Vídeo](videos/Myelination%20I%2003.mp4)
[Legenda do video em Português](legendas/Myelination%20I%2003.txt)

## Question 2
Label the parts of this axon:
[Imagem](images/Myelination%20I%2002.png)

A: **myelin: myelin sheath**. The insulating wrap around the axon.

B: **node: node of Ranvier**. The exposed gap between two myelin segments.

C: **glia: glia (supporting cell)**. The cell that forms the myelin around the axon.

## Question 3
A myelin sheath primarily works because... (Indicate all that apply.)

- **it effectively increases the thickness of the membrane.**
- **it prevents ions from flowing through the membrane.**
Myelin effectively increases membrane thickness, which lowers capacitance, and prevents ions from flowing through the covered membrane, which raises membrane resistance and reduces current leakage.

## Question 4
1 point possible (graded)
The idea of saltatory conduction is that, along an axon, myelinated axon segments ______ while unmyelinated axon segments ________.

**Passively spread ionic current; re-initiate the action potential**. Current spreads passively beneath the myelin. At each unmyelinated gap, called a node of Ranvier, voltage-gated Na⁺ channels regenerate the action potential.

---

# Myelination II - Bringing It All Together

Let's now bring together all of the ideas we have been discussing so far regarding axon conduction speed, from the passive properties of the membrane to the use of myelin. In particular, we can use our knowledge of these different ideas to understand what can happen in the nervous system when certain parts of the neurons, such as its myelin sheath, are damaged or otherwise not working.

## Make a Prediction
Although myelin is an important factor in action potential conduction, there are situations where myelin can become damaged - this is a real situation that can occur in some diseases. What do you predict will happen to the propagating action potential as it travels down an axon with damaged myelin?
**I predict the action potential will travel more slowly and may stop altogether where the myelin is damaged. More current leaks across the exposed membrane, and the higher capacitance means more charge is needed to change its voltage. As a result, the next node of Ranvier takes longer to reach threshold. If it never reaches threshold, it cannot regenerate the action potential.**

## Putting It All Together
In the interactive below, you can press the stimulator button to activate an action potential, and explore different variables to see how they affect action potential propagation. "Race mode" will compare your current settings to the default.

Investigate for yourself everything we have discussed thus far about myelin and the properties that affect action potential propagation. Specifically pay attention to the toggle for ‘damaged myelin’ to test your prediction from the question above. Use ‘race mode’ to see how the resistance and capacitance can interact with added myelin in order to affect action potential conduction.

If you would prefer to have the readout as sound, you can start the sound and adjust the pitch using the buttons below.

[Vídeo](videos/Myelination%20II.mp4)
[Legenda do video em Português](legendas/Myelination%20II.txt)

## Question 1
True or False: Consider two axons. Axon A is 10mm in length and is completely covered in myelin, all along its length. Axon B is 10mm in length and has separate segments of myelin (i.e. with Nodes of Ranvier) from one end to the other. If we measure how quickly an action potential propagates along the entire length of each axon, axon A should conduct action potentials faster than axon B.
**False**. In axon A, depolarization spreads passively under the myelin and weakens with distance. Axon B has nodes of Ranvier, where voltage-gated Na⁺ channels regenerate the action potential so it can travel reliably along the full axon.

---

# Lesson 4: Conclusion

At the beginning of this course, we established that neurons can have an electrical potential across their membrane and are able to use electrical signaling. The overall goal we’ve had is to understand the electrical properties of the neuron and how an electrical signal is sent. This led us to investigate both the passive and the active properties of the membrane.

We've now reached the end of Lesson 4, and we’ve brought all of this knowledge about active and passive properties together. We’ve seen that action potentials can propagate down an axon as a state of depolarization. In other words, depolarization of one section of the membrane can cause depolarization in adjacent segments of the membrane. The passive properties of the membrane, the resistive and capacitive properties, greatly affect the speed at which an action potential travels.

Of course, in the nervous system, we want signals to be sent fast. One solution observed in nature is the use of a giant axon. Another solution, which is found in humans, is the use of a myelin sheath. Myelin serves as insulation for the neuron and allows charge to travel faster and farther. The movement of an action potential down a myelinated axon occurs by ‘saltatory conduction.’ This name is given because the action potential is regenerated at Nodes of Ranvier where there are many ion channels, while charge passively spreads along the myelinated segments.