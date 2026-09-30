from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import os

# Load cropped emblem mark
mark_img = Image.open('assets/logo_mark.png').convert('RGBA')

# Target dimensions and background color
bg_rgb = (15, 52, 115)
color_rgb = (246, 244, 241)

# We will create a high-resolution logo image compositing mark_img + "Jana Prints"
# Let's inspect different font options available in Windows Fonts
font_paths = [
    ('C:\\Windows\\Fonts\\segoescb.ttf', 'Segoe Script Bold'),
    ('C:\\Windows\\Fonts\\segoeprb.ttf', 'Segoe Print Bold'),
    ('C:\\Windows\\Fonts\\Inkfree.ttf', 'Ink Free'),
    ('C:\\Windows\\Fonts\\mvboli.ttf', 'MV Boli'),
    ('C:\\Windows\\Fonts\\georgiab.ttf', 'Georgia Bold')
]

for font_path, font_name in font_paths:
    if not os.path.exists(font_path):
        continue
    
    # Create canvas for 2x resolution
    canvas_w = 1400
    canvas_h = 750
    canvas = Image.new('RGBA', (canvas_w, canvas_h), bg_rgb + (255,))
    
    # Paste mark centered at top
    mark_w, mark_h = mark_img.size
    mark_scale = 0.82
    new_mark_w = int(mark_w * mark_scale)
    new_mark_h = int(mark_h * mark_scale)
    resized_mark = mark_img.resize((new_mark_w, new_mark_h), Image.Resampling.LANCZOS)
    
    mark_x = (canvas_w - new_mark_w) // 2
    mark_y = 40
    canvas.paste(resized_mark, (mark_x, mark_y), resized_mark)
    
    # Render "Jana Prints" text below mark
    draw = ImageDraw.Draw(canvas)
    font_size = 96
    font = ImageFont.truetype(font_path, font_size)
    
    text = "Jana Prints"
    bbox = font.getbbox(text)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    text_x = (canvas_w - text_w) // 2
    text_y = mark_y + new_mark_h + 30
    
    # Draw text with subtle matching shadow/glow for depth
    draw.text((text_x, text_y), text, font=font, fill=color_rgb + (255,))
    
    # Save solid version
    out_name = f"assets/logo_candidate_{font_name.replace(' ', '_')}.png"
    canvas.save(out_name)
    print(f"Saved {out_name} (Size: {canvas_w}x{canvas_h})")

    # Save primary logo as logo_jana_prints.png using Segoe Script Bold
    if 'segoescb' in font_path:
        canvas.save('assets/logo_jana_prints.png')
        
        # Create transparent background version as logo_jana_prints_transparent.png
        arr = np.array(canvas)
        rgb_arr = arr[:, :, :3].astype(float)
        bg_float = np.array(bg_rgb, dtype=float)
        dist = np.sqrt(np.sum((rgb_arr - bg_float) ** 2, axis=2))
        
        # Smooth alpha blending
        alpha = np.clip((dist - 15) / (55 - 15) * 255, 0, 255).astype(np.uint8)
        arr[:, :, 3] = alpha
        
        transparent_img = Image.fromarray(arr, 'RGBA')
        transparent_img.save('assets/logo_jana_prints_transparent.png')
        
        # Also copy to assets/logo_transparent.png to seamlessly replace the old file!
        transparent_img.save('assets/logo_transparent.png')
        transparent_img.save('assets/logo.png')
        print("Updated assets/logo_transparent.png and assets/logo.png successfully!")
