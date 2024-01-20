<script setup lang="ts">

</script>

<template>
  <section class="about">
    <h1>
      “Veracruz is dying”:
      <span class="subtitle">the US occupation of Veracruz in history and memory</span>
    </h1>
    <details>
      <summary>
        <h2>About this project</h2>
      </summary>
      <p class="byline">by <a href="https://dmoles.info/">David Moles</a></p>
      <p>
        An archival remix prototype for 583 Foundations of Preservation and Archives,
        in the <a href="https://comminfo.rutgers.edu/graduate-programs/master-information">Master
        of Information program</a> at the Rutgers School of Communication and Information,
        <a href="https://comminfo.rutgers.edu/dalbello-marija">Dr. Marija Dalbello</a>, instructor,
        fall 2022.
      </p>
      <p>
        This interactive web exhibit allows patrons to explore through original documents the
        context, history, and aftermath of the US occupation of Veracruz in 1914, its impact
        on US-Mexican relations in the 20th century and its imprint on US self-perception as
        an imperial or quasi-imperial power in Latin America and the Caribbean. A combined
        map and timeline, situating those documents in both time and space and connecting them
        to one another through both geography and temporal sequence, allows a casual user to
        follow the story of the occupation in chronological order or to sample it non-linearly,
        while for teachers it can serve as a students’ entrypoint to the material or as a
        basis for more structured assignments.
      </p>
      <ul>
        <li>
          <a target="_blank" type="application/pdf"
             href="Veracruz%20is%20dying%20-%20Proposal.pdf">Read more about this project (PDF)</a>
        </li>
      </ul>
      <h3>Instructions</h3>
      <ul>
        <li>Click on a timeline entry or a map icon to view a document associated with that time and place
          or to close an open document view.
        </li>
        <li>Click on the links in the document view to navigate between events, or to view the original
          document in its home archive.
        </li>
      </ul>
    </details>
  </section>
</template>

<style lang="scss">
@use '../_colors';

.about {
  padding: 1.2rem;
  max-width: 768px;

  color: colors.$penguin;

  h1, h2, h3 {
    font-family: Chivo, sans-serif;
    font-weight: bold;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.3333em;

    margin-bottom: 0.4em;

    span.subtitle {
      display: block;
      font-size: 1.2rem;
      line-height: 1.3333em;
      margin-left: 1.2rem;
    }
  }

  h2, h3 {
    line-height: 1.3333em;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 1.6em;
    margin-bottom: 0.6667em;
    margin-left: 1.2rem;
  }

  summary {
    border: none; //1px solid white;
    h2 {
      border: none; // 1px dotted yellow;
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 0.25em;
    }
  }

  p, ul {
    font-family: 'EB Garamond', serif;
    font-size: 1.2rem;
    line-height: 1.3333em;
    margin-bottom: 0.6667em;
    margin-left: 1.2rem;
  }

  p {
    &.byline {
      font-style: italic;
      margin-bottom: 1.3333em;
    }
  }

  a {
    color: colors.$jasper-blue-light;
  }

  li {
    list-style: square;
    margin-left: 1.2rem;
    margin-bottom: 0.6667em;
  }
}
</style>
