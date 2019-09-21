<script>
  import {
    categoryLabels,
    categoryIndex,
    price,
    taxes,
    taxIndex,
    taxLabel,
    volumes,
    volumeIndex,
    volumeLabel,
    sizes,
    sizeIndex,
    sizeLabel,
    weight,
    final
  } from "./data";

  const print = () => {};
</script>

<page>
  <actionBar title="Tính Giá Nhanh" icon="">
    <!-- <actionItem on:tap={print} android.systemIcon="ic_menu_camera" /> -->
  </actionBar>
  <scrollView>
    <stackLayout>
      <segmentedBar bind:selectedIndex={$categoryIndex}>
        <segmentedBarItem title="Nước hoa" />
        <segmentedBarItem title="Mỹ phẩm" />
        <segmentedBarItem title="Son" />
        <segmentedBarItem title="Khác" />
      </segmentedBar>

      <gridLayout rows="auto auto" columns="60 * 75">
        <label row="0" col="0" text="Giá" />
        <textField row="0" col="1" bind:text={$price} keyboardType="number" />
        <label row="0" col="2" text="USD" />
      </gridLayout>

      <gridLayout rows="auto auto" columns="60 * 75">
        <label row="0" col="0" text="Thuế" />
        <slider
          row="0"
          col="1"
          bind:value={$taxIndex}
          minValue="0"
          maxValue={taxes.length - 1} />
        <label row="0" col="2" text={$taxLabel} textWrap="true" />
      </gridLayout>

      <gridLayout rows="auto auto" columns="60 * 75">
        <label row="0" col="0" text="Cỡ" />
        <!-- Perfume -->
        <slider
          row="0"
          col="1"
          bind:value={$volumeIndex}
          minValue="0"
          maxValue={volumes.length - 1}
          visibility={$categoryIndex === 0 ? '' : 'collapsed'} />
        <label
          row="0"
          col="2"
          text={$volumeLabel}
          visibility={$categoryIndex === 0 ? '' : 'collapsed'}
          textWrap="true" />
        <!-- Cosmetics -->
        <slider
          row="0"
          col="1"
          bind:value={$sizeIndex}
          minValue="0"
          visibility={$categoryIndex === 1 ? '' : 'collapsed'}
          maxValue={sizes.length - 1} />
        <label
          row="0"
          col="2"
          text={$sizeLabel}
          visibility={$categoryIndex === 1 ? '' : 'collapsed'}
          textWrap="true" />
        <!-- Lipsticks -->
        <label
          row="0"
          col="1"
          text="4"
          margin="0 10"
          padding="0 5"
          visibility={$categoryIndex === 2 ? '' : 'collapsed'} />
        <label
          row="0"
          col="2"
          text="oz"
          visibility={$categoryIndex === 2 ? '' : 'collapsed'}
          textWrap="true" />
        <!-- Others -->
        <textField
          row="0"
          col="1"
          bind:text={$weight}
          keyboardType="number"
          visibility={$categoryIndex > 2 ? '' : 'collapsed'} />
        <label
          row="0"
          col="2"
          text="oz"
          visibility={$categoryIndex > 2 ? '' : 'collapsed'}
          textWrap="true" />
      </gridLayout>

      <label class="h1 text-center" text={$final} />
    </stackLayout>
  </scrollView>
</page>
