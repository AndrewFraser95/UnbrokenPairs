### Hey this is my solution to Pairwise


## Introduction
As i've not had an awful lot of free time this is the most basic js, html app you've ever see.
It takes in the input from the user and outputs the number of pairs below.
It also prints the zero-index'd pair coordinates out to console.

# Awareness
The fact I've done it as a hacky js update text content app isn't ideal.
But also the crux of the Challenge is the solution of which has hopefully been completed successfully.

# Thought process
At first I just wrote a simple, find AB and XY pairs in this string.
Then thought how I can best optimise. 
E.g. Don't check for AB and BA pairs, just check for AB, but do so also as a rolling pair. i.e. the AB pair can have A at 2 but the B at 0.

I then also knew that the blocking would become an issue so started tracking at what index pairs were made and add them to a "blocking" array.