<script>
  import * as React from "react";
  import * as ReactDOM from "react-dom";
  import { afterUpdate, onDestroy } from "svelte";
  import { useControls } from "leva";

  function LevaReact(props) {
    useControls(props.controls);
    return null;
  }

  let container;
  afterUpdate(() => {
    const { children, ...props } = $$props;
    ReactDOM.render(React.createElement(LevaReact, props, children), container);
  });
  onDestroy(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
</script>

<div class="React" bind:this={container} />
