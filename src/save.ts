export const saveToFile = async (fileName: string, mod: AcolyteFightMod) => {
  const status = await Deno.permissions.request({ name: "write" });
  if (status.state === "granted") {
    await Deno.writeFile(
      fileName,
      new TextEncoder().encode(JSON.stringify(mod))
    );
  } else {
    console.log("Failed to save to file, Access Denied");
  }
};
