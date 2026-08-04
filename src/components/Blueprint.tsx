/**
 * The four corner registration marks every blueprint-framed element wears
 * (`.blueprint` + `<i class="corner tl/tr/bl/br">`). Industry readme.md:
 * "Do not drop the registration marks from a framed element."
 */
export function BlueprintCorners() {
  return (
    <>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </>
  );
}
