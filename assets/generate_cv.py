#!/usr/bin/env python3
"""Generate CV PDF — vFinal2: tighter edu spacing."""
import os, io, qrcode, datetime, tempfile
from PIL import Image, ImageDraw
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image as RLImage,
    HRFlowable, Table, TableStyle
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OUTPUT = '/opt/data/frontend-src/assets/cv-corentin-reault.pdf'
PHOTO = '/opt/data/frontend-src/assets/img/profile-img.jpg'
CKA_BADGE = '/opt/data/frontend-src/assets/img/cka-badge.png'
CKS_BADGE = '/opt/data/frontend-src/assets/img/cks-badge.png'

CYAN = HexColor('#38bdf8')
CYAN_DIM = HexColor('#0ea5e9')
BG_DARK = HexColor('#0a0f1a')
TEXT_LIGHT = HexColor('#f1f5f9')
TEXT_MUTED = HexColor('#94a3b8')
TEXT_MAIN = HexColor('#1e293b')
WHITE = HexColor('#ffffff')

SIDEBAR_W = 62*mm; PAD = 16*mm; RIGHT_MARGIN = 16*mm; W, H = A4
MAIN_LEFT = SIDEBAR_W + PAD

FONT = 'Helvetica'; FONT_B = 'Helvetica-Bold'
try:
    pdfmetrics.registerFont(TTFont('D', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
    pdfmetrics.registerFont(TTFont('DB', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
    FONT = 'D'; FONT_B = 'DB'
except: pass

def make_circular_photo(path, size_mm, out_path):
    dpi = 150; px = int(size_mm * dpi / 25.4)
    img = Image.open(path).convert('RGBA').resize((px, px), Image.LANCZOS)
    mask = Image.new('L', (px, px), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, px, px), fill=255)
    r = Image.new('RGBA', (px, px), (0,0,0,0))
    r.paste(img, (0, 0), mask); r.save(out_path, format='PNG')

def draw_sidebar(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG_DARK); canvas.rect(0, 0, SIDEBAR_W, H, fill=1, stroke=0)
    canvas.setFillColor(CYAN); canvas.rect(0, H-3, SIDEBAR_W, 3, fill=1, stroke=0)
    x = 7*mm; sw = SIDEBAR_W - 14*mm; cy = H - 50*mm
    def sec(t):
        nonlocal cy; cy -= 4*mm
        canvas.setFont(FONT_B, 9.5); canvas.setFillColor(CYAN); canvas.drawString(x, cy, t.upper())
        cy -= 2*mm; canvas.setStrokeColor(CYAN_DIM); canvas.setLineWidth(0.5); canvas.line(x, cy, x+sw, cy); cy -= 4.5*mm
    def link_item(label, url, text):
        nonlocal cy
        canvas.setFont(FONT, 7.5); canvas.setFillColor(TEXT_MUTED); canvas.drawString(x, cy, label); cy -= 3.5*mm
        canvas.setFont(FONT_B, 7.5); canvas.setFillColor(CYAN_DIM); canvas.drawString(x, cy, text)
        tw = canvas.stringWidth(text, FONT_B, 7.5)
        canvas.linkURL(url, (x, cy-1, x+tw+2, cy+3*mm), relative=0); cy -= 5.5*mm
    sec('Contact')
    link_item('Email','mailto:corentin.reault@protonmail.com','corentin.reault@protonmail.com')
    link_item('LinkedIn','https://linkedin.com/in/corentin-reault','linkedin.com/in/corentin-reault')
    link_item('GitHub','https://github.com/corentin-reault','github.com/corentin-reault')
    sec('Comp\u00e9tences')
    for t, l1, l2 in [
        ('Kubernetes','CKA & CKS certifi\u00e9','Helm, Podman, ops K8s'),
        ('Cloud / Infra','Terraform, Ansible','GitOps, CI/CD'),
        ('R\u00e9seau','Cisco, Arista, Extreme, Aruba','EVPN-VXLAN, OSPF, BGP, LACP'),
        ('S\u00e9curit\u00e9','Cilium/eBPF, Stormshield','DMZ, segmentation, iptables'),
        ('Observabilit\u00e9','Prometheus, VictoriaMetrics','Alertmanager, Grafana'),
        ('Langages','Python, Go, Bash','YAML/HCL, Jinja2'),
        ('OS','Linux (RHEL, NixOS, Arch)',''),
    ]:
        canvas.setFont(FONT_B, 8); canvas.setFillColor(TEXT_LIGHT); canvas.drawString(x, cy, t); cy -= 3.5*mm
        canvas.setFont(FONT, 7); canvas.setFillColor(TEXT_MUTED); canvas.drawString(x, cy, l1); cy -= 3.5*mm
        if l2: canvas.setFont(FONT, 7); canvas.setFillColor(TEXT_MUTED); canvas.drawString(x, cy, l2); cy -= 5*mm
        else: cy -= 1.5*mm
    sec('Langues')
    for l, lv in [('Fran\u00e7ais','Natif'),('Anglais','B2+/C1 (Linguaskills)'),('Allemand','A2/B1 (Goethe Pro Test)')]:
        canvas.setFont(FONT_B, 8); canvas.setFillColor(TEXT_LIGHT); canvas.drawString(x, cy, l); cy -= 3.5*mm
        canvas.setFont(FONT, 7); canvas.setFillColor(TEXT_MUTED); canvas.drawString(x, cy, lv); cy -= 5*mm
    sec('Centres d\'int\u00e9r\u00eat')
    for i in ['Infrastructure & Cloud','S\u00e9curit\u00e9 r\u00e9seau','Automatisation','NixOS, Arch Linux']:
        canvas.setFont(FONT, 7.5); canvas.setFillColor(TEXT_LIGHT); canvas.drawString(x, cy, '\u2022 '+i); cy -= 4*mm
    cy = 24*mm; qs = 22*mm
    qp = getattr(draw_sidebar,'qr_path',None)
    if qp and os.path.exists(qp):
        canvas.drawImage(qp, (SIDEBAR_W-qs)/2, cy, width=qs, height=qs, preserveAspectRatio=True)
        cy += qs+1.5*mm; canvas.setFont(FONT_B, 7); canvas.setFillColor(CYAN_DIM)
        ut='reault.tech'; uw=canvas.stringWidth(ut,FONT_B,7)
        canvas.drawCentredString(SIDEBAR_W/2, cy, ut)
        cx=(SIDEBAR_W-uw)/2; canvas.linkURL('https://reault.tech',(cx,cy-1,cx+uw,cy+3*mm),relative=0)
        cy+=3.5*mm; canvas.setFont(FONT,6.5); canvas.setFillColor(WHITE)
        canvas.drawCentredString(SIDEBAR_W/2, cy, 'Scannez pour le portfolio')
    canvas.setFont(FONT,6); canvas.setFillColor(HexColor('#2a3447')); canvas.drawString(x,10*mm,'CV '+datetime.datetime.now().strftime('%d/%m/%Y'))
    canvas.restoreState()

def build_pdf():
    ps=28; pf=tempfile.NamedTemporaryFile(suffix='.png',delete=False); make_circular_photo(PHOTO,ps,pf.name); pf.close()
    qr=qrcode.QRCode(box_size=6,border=1); qr.add_data('https://reault.tech'); qr.make(fit=True)
    qi=qr.make_image(fill_color='#ffffff',back_color='#0a0f1a')
    qp=tempfile.NamedTemporaryFile(suffix='.png',delete=False).name; qi.save(qp,format='PNG'); draw_sidebar.qr_path=qp
    doc=SimpleDocTemplate(OUTPUT,pagesize=A4,topMargin=14*mm,bottomMargin=14*mm,leftMargin=MAIN_LEFT,rightMargin=RIGHT_MARGIN,title='Corentin Reault - CV',author='Corentin Reault')
    sN=ParagraphStyle('N',fontName=FONT_B,fontSize=24,textColor=TEXT_MAIN,leading=28,spaceAfter=1*mm)
    sT=ParagraphStyle('T',fontName=FONT,fontSize=11,textColor=CYAN_DIM,leading=14,spaceAfter=3*mm)
    sS=ParagraphStyle('S',fontName=FONT_B,fontSize=13,textColor=BG_DARK,leading=16,spaceBefore=5*mm,spaceAfter=3*mm)
    sSub=ParagraphStyle('Sub',fontName=FONT_B,fontSize=10.5,textColor=BG_DARK,leading=14,spaceAfter=3*mm)
    sDt=ParagraphStyle('D',fontName=FONT,fontSize=8.5,textColor=CYAN_DIM,leading=11,spaceAfter=4*mm)
    sBul=ParagraphStyle('B',fontName=FONT,fontSize=9.5,textColor=TEXT_MAIN,leading=13,leftIndent=10,spaceAfter=1.5*mm)
    # Tighter spacing for edu (non-cert) entries
    sEdu=ParagraphStyle('Edu',fontName=FONT_B,fontSize=10.5,textColor=BG_DARK,leading=14,spaceAfter=1*mm)
    sEduDt=ParagraphStyle('EduDt',fontName=FONT,fontSize=8.5,textColor=CYAN_DIM,leading=11,spaceAfter=4*mm)
    sCT=ParagraphStyle('CT',fontName=FONT_B,fontSize=10.5,textColor=BG_DARK,leading=14,spaceAfter=1*mm)
    sCD=ParagraphStyle('CD',fontName=FONT,fontSize=8.5,textColor=CYAN_DIM,leading=11,spaceAfter=0)
    story=[]
    story.append(Paragraph('Corentin R\u00e9ault',sN))
    story.append(Paragraph('Ing\u00e9nieur SysOps &amp; R\u00e9seau',sT))
    story.append(HRFlowable(width="100%",thickness=1.5,color=CYAN_DIM,spaceBefore=1*mm,spaceAfter=4*mm))
    story.append(Paragraph('EXP\u00c9RIENCES PROFESSIONNELLES',sS))
    story.append(Paragraph('Ing\u00e9nieur SysOps',sSub))
    story.append(Paragraph('Mars 2024 - Aujourd\'hui | Rakuten France',sDt))
    for b in [
        'Conception et optimisation d\u2019architectures de reverse proxy / load balancing assurant haute disponibilit\u00e9 et d\u00e9ploiements sans interruption.',
        'Mise en \u0153uvre d\u2019une architecture s\u00e9curis\u00e9e conforme PCI-DSS avec segmentation r\u00e9seau et d\u00e9ploiement d\u2019une DMZ pour les services web.',
        'Pilotage technique de la cr\u00e9ation d\u2019un cloud priv\u00e9 : industrialisation via Terraform, provisionning, configuration initiale, et coordination r\u00e9seau inter-partenaires.',
        'D\u00e9ploiement et maintien de clusters Kubernetes, industrialisation des d\u00e9ploiements via Helm Charts (Go Templates) et accompagnement dans la migration des applications de Docker vers Kubernetes.',
        'Migration de l\u2019infrastructure d\u2019automatisation de SaltStack vers Ansible, et industrialisation du provisioning et de la configuration de l\u2019infrastructure via Terraform et Ansible.',
    ]: story.append(Paragraph('\u2022 '+b,sBul))
    story.append(Spacer(1,4*mm))
    story.append(Paragraph('Stage - Architecte r\u00e9seau',sSub))
    story.append(Paragraph('Ao\u00fbt 2023 - F\u00e9vrier 2024 | CEA-DAM',sDt))
    story.append(Paragraph('\u2022 Participation \u00e0 un projet de restructuration du r\u00e9seau gr\u00e2ce \u00e0 des technologies d\u2019op\u00e9rateurs et de data center (EVPN-VXLAN).',sBul))
    story.append(Spacer(1,4*mm))
    story.append(Paragraph('FORMATIONS &amp; CERTIFICATIONS',sS))
    def cr(bp,title,detail):
        badge=RLImage(bp,width=10*mm,height=10*mm)
        t=Table([[badge,Paragraph(title,sCT)],[Paragraph('',sCD),Paragraph(detail,sCD)]],colWidths=[13*mm,W-MAIN_LEFT-RIGHT_MARGIN-13*mm])
        t.setStyle(TableStyle([('VALIGN',(0,0),(0,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),1*mm),('BOTTOMPADDING',(0,0),(-1,-1),0),('SPAN',(0,0),(0,1))]))
        return t
    story.append(cr(CKS_BADGE,'CKS - Certified Kubernetes Security Specialist','Mai 2026 | The Linux Foundation'))
    story.append(Spacer(1,3*mm))
    story.append(cr(CKA_BADGE,'CKA - Certified Kubernetes Administrator','Avril 2026 | The Linux Foundation'))
    story.append(Spacer(1,4*mm))
    # Edu entries with tighter spacing
    story.append(Paragraph('Ing\u00e9nieur r\u00e9seau et t\u00e9l\u00e9communications',sEdu))
    story.append(Paragraph('2018 - 2024 | Universit\u00e9 de Technologie de Troyes',sEduDt))
    story.append(Paragraph('Elektrotechnik und Informationstechnik',sEdu))
    story.append(Paragraph('2023 | Darmstadt University of Applied Sciences',sEduDt))
    def ofp(canvas,doc):
        draw_sidebar(canvas,doc)
        pz=ps*mm; px=(SIDEBAR_W-pz)/2; py=H-40*mm
        canvas.drawImage(pf.name,px,py,width=pz,height=pz,preserveAspectRatio=True,mask='auto')
    doc.build(story,onFirstPage=ofp,onLaterPages=draw_sidebar)
    os.unlink(pf.name); os.unlink(qp)
    print('PDF cr\u00e9\u00e9:',OUTPUT); print('Taille: %.1f KB'%(os.path.getsize(OUTPUT)/1024))

if __name__=='__main__': build_pdf()